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
export class ScheduleWidget {
    constructor(parent) {
        this.mParentElement = parent;
        this.mIDPrefix = "Table";
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
    getElementID(element) {
        return { row: parseInt(element.getAttribute("data-row" /* RowIndex */)),
            col: parseInt(element.getAttribute("data-col" /* ColIndex */)) };
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
    render(layout) {
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
                    this.mHtmlCells[rowIndex][colIndex] = htmlCell;
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
    }
}
//# sourceMappingURL=ScheduleWidget.js.map