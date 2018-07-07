import { Datum } from "../data/DataItemHelpers.js";
class ColItem {
    constructor() {
        this.value = "";
        this.rowspan = 0;
        this.colspan = 0;
        this.isEmpty = true;
    }
}
;
;
class HtmlCell {
    constructor(element, data) {
        this.mElement = element;
        this.id = data.id;
        this.owner = data.owner;
    }
    get element() {
        return this.mElement;
    }
}
class Selection {
    constructor(row_min, row_max, col_min, col_max) {
        this.row_min = row_min;
        this.row_max = row_max;
        this.col_min = col_min;
        this.col_max = col_max;
        console.assert(this.row_min < this.row_max, "Invalid row_min and row_max values. row_min must be less than row_max");
        console.assert(this.col_min < this.col_max, "Invalid col_min and col_max values. col_min must be less than col_max");
        this.mRow_start = -1;
        this.mCol_start = -1;
        this.mCol_end = -1;
        this.mRow_end = -1;
    }
    get row_start() { return this.mRow_start; }
    get row_end() { return this.mRow_end; }
    get col_start() { return this.mCol_start; }
    get col_end() { return this.mCol_end; }
    set(rStart, cStart, rEnd = -1, cEnd = -1) {
        this.mRow_start = rStart;
        this.mRow_end = rEnd == -1 ? rStart : rEnd;
        this.mCol_start = cStart;
        this.mCol_end = cEnd == -1 ? cStart : cEnd;
        this.normalize();
    }
    get isSingleCell() {
        if (this.mRow_end == this.mRow_start && this.mCol_end == this.mCol_start) {
            return true;
        }
        return false;
    }
    get isActive() {
        if (this.mRow_start <= -1 || this.mCol_start <= -1) {
            return false;
        }
        return true;
    }
    clear() {
        this.mRow_start = this.row_start - 100;
        this.mCol_start = this.col_start - 100;
        this.mCol_end = this.col_start - 999;
        this.mRow_end = this.row_start - 999;
    }
    move(nbrRows, nbrCols) {
        this.mRow_start += nbrRows;
        this.mRow_end += nbrRows;
        this.mCol_start += nbrCols;
        this.mCol_end += nbrCols;
        this.normalize();
    }
    grow(rowCount, colCount) {
        this.mRow_end += rowCount;
        this.mCol_end += colCount;
        this.normalize();
    }
    click(rowId, colId) {
        if (!this.isActive) {
            this.set(rowId, colId);
            return;
        }
        if (rowId <= this.mRow_start) {
            //this.mRow_end = this.mRow_start
            this.mRow_start = rowId;
        }
        else if (rowId >= this.mRow_end) {
            this.mRow_end = rowId;
        }
        else {
            this.mRow_end = rowId;
        }
        if (colId <= this.mCol_start) {
            //this.mCol_end = this.mCol_start
            this.mCol_start = colId;
        }
        else if (colId >= this.mCol_end) {
            this.mCol_end = colId;
        }
        else if (colId > this.mCol_start && colId < this.mCol_end) {
            this.mCol_end = colId;
        }
        this.normalize();
    }
    normalize() {
        if (this.mRow_end < this.mRow_start) {
            // Swapping with destructuring
            [this.mRow_start, this.mRow_end] = [this.mRow_end, this.mRow_start];
        }
        if (this.mCol_end < this.mCol_start) {
            [this.mCol_start, this.mCol_end] = [this.mCol_end, this.mCol_start];
        }
        if (this.mRow_start < this.row_min) {
            this.mRow_start = this.row_min;
        }
        ;
        if (this.mRow_end > this.row_max) {
            this.mRow_end = this.row_max;
        }
        ;
        if (this.mCol_start < this.col_min) {
            this.mCol_start = this.col_min;
        }
        ;
        if (this.mCol_end > this.col_max) {
            this.mCol_end = this.col_end;
        }
        ;
    }
    //Helper functions take a function
    topRow(cb) {
        for (let colIndex = this.mCol_start; colIndex <= this.mCol_end; ++colIndex) {
            cb({ row: this.mRow_start, col: colIndex });
        }
    }
    bottomRow(cb) {
        for (let colIndex = this.mCol_start; colIndex <= this.mCol_end; ++colIndex) {
            cb({ row: this.mRow_end, col: colIndex });
        }
    }
    leftCol(cb) {
        for (let rowIndex = this.mRow_start; rowIndex <= this.mRow_end; ++rowIndex) {
            cb({ row: rowIndex, col: this.mCol_start });
        }
    }
    rightCol(cb) {
        for (let rowIndex = this.mRow_start; rowIndex <= this.mRow_end; ++rowIndex) {
            cb({ row: rowIndex, col: this.mCol_end });
        }
    }
    bodyOnly(cb) {
        for (let rowIndex = this.mRow_start + 1; rowIndex < this.mRow_end; ++rowIndex) {
            for (let colIndex = this.mCol_start + 1; colIndex < this.mCol_end; ++colIndex) {
                cb({ row: rowIndex, col: colIndex });
            }
        }
    }
    allCells(cb) {
        for (let rowIndex = this.mRow_start; rowIndex <= this.mRow_end; ++rowIndex) {
            for (let colIndex = this.mCol_start; colIndex <= this.mCol_end; ++colIndex) {
                cb({ row: rowIndex, col: colIndex });
            }
        }
    }
}
export class ScheduleWidget {
    constructor(parent) {
        this.onChange = (e) => {
            if (!this.mOwnerToHtml.has(e.owner)) {
                return true;
            }
            let oMap = this.mOwnerToHtml.get(e.owner);
            let that = this;
            e.ids.forEach((value, index) => {
                if (oMap.has(value)) {
                    oMap.get(value).element.textContent = e.values[index].toString();
                }
            });
            return true;
        };
        this.mParentElement = parent;
        this.mIDPrefix = "Table";
        this.mOwnerToHtml = new Map();
    }
    makeIDForCell(rowIndex, colIndex) {
        if (colIndex < 0) {
            return this.mIDPrefix + "_" + rowIndex.toString();
        }
        return this.mIDPrefix + "_" + rowIndex.toString() + "_" + colIndex.toString();
    }
    configureElement(element, rowIndex, colIndex) {
        element.id = this.makeIDForCell(rowIndex, colIndex);
        element.setAttribute("data-row" /* RowIndex */, rowIndex.toString());
        element.setAttribute("data-col" /* ColIndex */, colIndex.toString());
    }
    get root() {
        return this.mRoot;
    }
    selection_render_clear(sel) {
        let cb = (id) => {
            this.mHtmlCells[id.row][id.col].element.classList.remove("schedule-select-bottom" /* BottomBorder */, "schedule-select-left" /* LeftBorder */, "schedule-select-right" /* RightBorder */, "schedule-select" /* Selected */, "schedule-select-top" /* TopBorder */);
        };
        if (sel.isActive) {
            sel.allCells(cb);
        }
    }
    selection_render_all(sel) {
        let that = this;
        sel.topRow((id) => that.mHtmlCells[id.row][id.col].element.classList.add("schedule-select-top" /* TopBorder */, "schedule-select" /* Selected */));
        sel.bottomRow((id) => that.mHtmlCells[id.row][id.col].element.classList.add("schedule-select-bottom" /* BottomBorder */, "schedule-select" /* Selected */));
        sel.rightCol((id) => that.mHtmlCells[id.row][id.col].element.classList.add("schedule-select-right" /* RightBorder */, "schedule-select" /* Selected */));
        sel.leftCol((id) => that.mHtmlCells[id.row][id.col].element.classList.add("schedule-select-left" /* LeftBorder */, "schedule-select" /* Selected */));
        sel.bodyOnly((id) => that.mHtmlCells[id.row][id.col].element.classList.add("schedule-select" /* Selected */));
    }
    selection_setByRowCol(row, col) {
    }
    selection_setByData(id, owner) {
    }
    selection_move(rows, cols) {
    }
    selection_grow(rows, cols) {
    }
    selection_clear() {
        this.selection_render_clear(this.mCurrentSelection);
        this.mCurrentSelection.clear();
    }
    selection_click(id, newClick) {
        this.selection_render_clear(this.mCurrentSelection);
        if (newClick) {
            this.mCurrentSelection.set(id.row, id.col);
        }
        else {
            this.mCurrentSelection.click(id.row, id.col);
        }
        this.selection_render_all(this.mCurrentSelection);
    }
    getElementID(element) {
        /* let row = -1, col = -1;
         switch (element.tagName) {
             case "TH":
             case "TD":
                 let td = <HTMLTableCellElement>element;
                 col = td.cellIndex;
                 row = (<HTMLTableRowElement>td.parentElement).rowIndex;
                 break;
             case "TR":
                 break;
         }
 
         console.log(row == parseInt(element.getAttribute(SWAttributes.RowIndex)));
         console.log(col == parseInt(element.getAttribute(SWAttributes.ColIndex)));
         */
        return { row: parseInt(element.getAttribute("data-row" /* RowIndex */)),
            col: parseInt(element.getAttribute("data-col" /* ColIndex */)) };
    }
    getElementDetails(element) {
        let id = this.getElementID(element);
        return {
            id: id,
            data: new Datum(element.textContent, this.mHtmlCells[id.row][id.col].id, this.mHtmlCells[id.row][id.col].owner)
        };
    }
    change(elementIds, values) {
        // Fire onchange event before writing to the element
        // If on change evnet returns no write then don't write to the element. The onchange handled it
        // Code not implemeneted yet, therefore just write the new value into the element.
        if (elementIds.length != values.length) {
            console.log("Yo done fucked up.");
            return;
        }
        let that = this;
        elementIds.forEach((value, index) => {
            this.mHtmlCells[value.row][value.col].element.textContent = values[index];
        });
    }
    register_owner(owner) {
        if (this.mOwnerToHtml.has(owner) == false) {
            let newMap = new Map();
            this.mOwnerToHtml.set(owner, newMap);
            if (owner.events) {
                owner.events.addListener(this.onChange);
            }
            return newMap;
        }
        return this.mOwnerToHtml.get(owner);
    }
    clear_internals() {
        this.mOwnerToHtml = null;
        this.mOwnerToHtml = new Map();
        this.mHtmlCells = null;
    }
    render(layout) {
        // Emtpy the existing data structures
        this.clear_internals();
        let fragment = document.createDocumentFragment();
        let table = document.createElement("table");
        fragment.appendChild(table);
        let grid = layout.toGrid();
        this.mHtmlCells = new Array(grid.length);
        for (let rowIndex = 0; rowIndex < grid.length; ++rowIndex) {
            let tr = document.createElement("tr");
            let row = grid[rowIndex];
            this.mHtmlCells[rowIndex] = new Array(row.length);
            for (let colIndex = 0; colIndex < row.length; ++colIndex) {
                let cell = row[colIndex];
                if (!cell.isEmpty()) {
                    let tdType = cell.isHeader ? "th" : "td";
                    let td = document.createElement(tdType);
                    // Update the internal mapping
                    let htmlCell = new HtmlCell(td, cell.data);
                    this.register_owner(cell.data.owner).set(cell.data.id, htmlCell); //Could be made more efficent with cacheing
                    this.mHtmlCells[rowIndex][colIndex] = htmlCell;
                    // End internal mappings
                    if (cell.rowspan > 1)
                        td.setAttribute("rowspan" /* Rowspan */, cell.rowspan.toString());
                    if (cell.colspan > 1)
                        td.setAttribute("colspan" /* Colspan */, cell.colspan.toString());
                    if (cell.cssClasses.length > 0) {
                        cell.cssClasses.forEach((value) => { td.classList.add(value); });
                    }
                    td.textContent = cell.data.value.toString();
                    this.configureElement(td, rowIndex, colIndex);
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        this.mParentElement.appendChild(fragment);
        this.mRoot = this.mParentElement.lastChild;
        grid = null;
        // Currently a quick hack should make it ignore the header cells
        this.mCurrentSelection = new Selection(2, this.mHtmlCells.length, 2, this.mHtmlCells[0].length);
    }
}
//# sourceMappingURL=ScheduleWidget.js.map