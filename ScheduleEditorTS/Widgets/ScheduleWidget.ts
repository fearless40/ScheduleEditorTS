import { LayoutTable } from "../view/TableLayout.js";
import { DataItem, DataView, EventOnChange, DataChangedBy} from "../data/Data.js";
import { Datum } from "../data/DataItemHelpers.js";

class ColItem {
    constructor() {}
    node: HTMLElement
    value: string = ""
    rowspan: number = 0
    colspan: number = 0
    isEmpty:boolean = true
}

export const enum SWAttributes {
    RowIndex = "data-row",
    ColIndex = "data-col",
    Rowspan = "rowspan",
    Colspan = "colspan"
};    

const enum CssSelection {
    TopBorder = "schedule-select-top",
    BottomBorder = "schedule-select-bottom",
    LeftBorder = "schedule-select-left",
    RightBorder = "schedule-select-right",
    Selected = "schedule-select"
}

export interface ScheduleWidgetID {
    row: number
    col: number
};

export interface ScheduleWidgetCellInfo {
    id: ScheduleWidgetID
    data: DataItem
}

class HtmlCell {
    constructor( element : HTMLElement, data : DataItem ) {
        this.mElement = element;
        this.id = data.id;
        this.owner = data.owner;
    }
    
    private mElement : HTMLElement;

    get element(): HTMLElement {
        return this.mElement;
    }
    readonly id: number;
    readonly owner: DataView;
}

type HTMLCells = Array<Array<HtmlCell>>
type NumberToCell = Map<number, HtmlCell>;
type OwnerToCellMap = Map<DataView, NumberToCell>

interface SelectionCellCB {
    (id: ScheduleWidgetID): void;
}

class Selection {
    private mRow_start: number;
    private mRow_end: number;
    private mCol_start: number;
    private mCol_end: number;

    get row_start() { return this.mRow_start; }
    get row_end() { return this.mRow_end; }
    get col_start() { return this.mCol_start; }
    get col_end() { return this.mCol_end; }

    constructor(
        private row_min: number,
        private row_max: number,
        private col_min: number,
        private col_max: number) {

        console.assert(this.row_min < this.row_max, "Invalid row_min and row_max values. row_min must be less than row_max");
        console.assert(this.col_min < this.col_max, "Invalid col_min and col_max values. col_min must be less than col_max");

        this.mRow_start = -1;
        this.mCol_start = -1;
        this.mCol_end = -1;
        this.mRow_end = -1;
    }

    set(rStart: number, cStart: number, rEnd: number = -1, cEnd: number = -1) {
        this.mRow_start = rStart;
        this.mRow_end = rEnd == -1 ? rStart : rEnd;
        this.mCol_start = cStart;
        this.mCol_end = cEnd == -1 ? cStart : cEnd;
        this.normalize();
    }

    get isSingleCell(): boolean {
        if (this.mRow_end == this.mRow_start && this.mCol_end == this.mCol_start) {
            return true;
        }
        return false;
    }

    get isActive(): boolean {
        if (this.mRow_start <= -1 || this.mCol_start <= -1) {
            return false;
        }
        return true;
    }

    clear(): void {
        this.mRow_start = this.row_start - 100;
        this.mCol_start = this.col_start - 100;
        this.mCol_end = this.col_start - 999;
        this.mRow_end = this.row_start - 999;
    }

    move(nbrRows: number, nbrCols: number): void {
        this.mRow_start += nbrRows;
        this.mRow_end += nbrRows;

        this.mCol_start += nbrCols;
        this.mCol_end += nbrCols;

        this.normalize();
    }

    grow(rowCount: number, colCount: number): void {
        //this.click(this.mRow_end + rowCount, this.mCol_end + colCount);
        this.mRow_end += rowCount;
        this.mCol_end += colCount;
        //this.normalize();
    }

    click(rowId: number, colId: number): void {
        if (!this.isActive) {
            this.set(rowId, colId);
            return;
        }

        if (rowId <= this.mRow_start) {
            //this.mRow_end = this.mRow_start
            this.mRow_start = rowId;
        }
        else {
            this.mRow_end = rowId;
        }

        if (colId <= this.mCol_start) {
            //this.mCol_end = this.mCol_start
            this.mCol_start = colId;
        }
        else {
            this.mCol_end = colId;
        }

        this.normalize();
    }

    

    private normalize(): void {
       /* if (this.mRow_end < this.mRow_start) {
            // Swapping with destructuring
            [this.mRow_start, this.mRow_end] = [this.mRow_end, this.mRow_start];
        }

        if (this.mCol_end < this.mCol_start) {
            [this.mCol_start, this.mCol_end] = [this.mCol_end, this.mCol_start];
        }
        */

        if (this.mRow_start < this.row_min) { this.mRow_start = this.row_min };
        if (this.mRow_start > this.row_max) { this.mRow_start = this.row_max };

        if (this.mRow_end > this.row_max) { this.mRow_end = this.row_max };
        if (this.mRow_end < this.row_min) { this.mRow_end = this.row_min };

        if (this.mCol_start < this.col_min) { this.mCol_start = this.col_min };
        if (this.mCol_start > this.col_max) { this.mCol_start = this.col_max };

        if (this.mCol_end > this.col_max) { this.mCol_end = this.col_max };
        if (this.mCol_end < this.col_min) { this.mCol_end = this.col_min };
    }

    //Helper functions take a function
    topRow(cb: SelectionCellCB): void {
        //let dir = this.mCol_start <= this.mCol_end ? 1 : -1;
        let cstart: number = this.mCol_start, cend: number = this.mCol_end;
        let row = this.mRow_start < this.mRow_end ? this.mRow_start : this.mRow_end;
        if (cstart > cend) { [cstart,cend] = [cend,cstart]}
        for (let colIndex = cstart; colIndex <= cend; ++colIndex ) {
            cb({ row: row, col: colIndex });
        }
    }

    bottomRow(cb: SelectionCellCB): void {
        let cstart: number = this.mCol_start, cend: number = this.mCol_end;
        if (cstart > cend) { [cstart, cend] = [cend, cstart] }
        let row = this.mRow_start > this.mRow_end ? this.mRow_start : this.mRow_end;
        for (let colIndex = cstart; colIndex <= cend; ++colIndex) {
            cb({ row: row, col: colIndex });
        }
    }

    leftCol(cb: SelectionCellCB): void {
        let rstart: number = this.mRow_start, rend: number = this.mRow_end;
        let col = this.mCol_start < this.mCol_end ? this.mCol_start : this.mCol_end;
        if (rstart > rend) { [rstart, rend] = [rend, rstart] }
        for (let rowIndex = rstart; rowIndex <= rend; ++rowIndex) {
            cb({row: rowIndex, col: col})
        }
    }

    rightCol(cb: SelectionCellCB): void {
        let rstart: number = this.mRow_start, rend: number = this.mRow_end;
        if (rstart > rend) { [rstart, rend] = [rend, rstart] }
        let col = this.mCol_start > this.mCol_end ? this.mCol_start : this.mCol_end;
        for (let rowIndex = rstart; rowIndex <= rend; ++rowIndex) {
            cb({ row: rowIndex, col: col })
        }
    }

    bodyOnly(cb: SelectionCellCB): void {
        let rstart: number = this.mRow_start, rend: number = this.mRow_end;
        if (rstart > rend) { [rstart, rend] = [rend, rstart] }
        let cstart: number = this.mCol_start, cend: number = this.mCol_end;
        if (cstart > cend) { [cstart, cend] = [cend, cstart] }

        for (let rowIndex = rstart+1; rowIndex <= rend-1; ++rowIndex ) {
            for (let colIndex = cstart + 1; colIndex <= cend - 1; ++colIndex ) {
                cb({ row: rowIndex, col: colIndex });
            }
        }
    }

    allCells(cb: SelectionCellCB): void {
        let rstart: number = this.mRow_start, rend: number = this.mRow_end;
        if (rstart > rend) { [rstart, rend] = [rend, rstart] }
        let cstart: number = this.mCol_start, cend: number = this.mCol_end;
        if (cstart > cend) { [cstart, cend] = [cend, cstart] }

        for (let rowIndex = rstart; rowIndex <= rend; ++rowIndex) {
            for (let colIndex = cstart; colIndex <= cend; ++colIndex) {
                cb({ row: rowIndex, col: colIndex });
            }
        }
    }

}
    
export class ScheduleWidget {
    
    
    private mParentElement: Node
    private mIDPrefix : string
    private mHtmlCells: HTMLCells;
    private mRoot: HTMLElement;
    private mOwnerToHtml: OwnerToCellMap;
    private mCurrentSelection: Selection;
    

    constructor(parent: Node) {
        this.mParentElement = parent;
        this.mIDPrefix = "Table";
        this.mOwnerToHtml = new Map<DataView, NumberToCell>();
    }

    private makeIDForCell(rowIndex:number, colIndex:number) : string {
         if( colIndex < 0 ) {
            return this.mIDPrefix + "_" + rowIndex.toString();
        }       

         return this.mIDPrefix + "_" + rowIndex.toString() + "_" + colIndex.toString();
    }

    private configureElement(element: HTMLElement , rowIndex : number, colIndex : number) {
        element.id = this.makeIDForCell(rowIndex, colIndex);
        element.setAttribute(SWAttributes.RowIndex, rowIndex.toString());
        element.setAttribute(SWAttributes.ColIndex, colIndex.toString());
    }
    
    get root() : HTMLElement {
        return this.mRoot;
    }

    private selection_render_clear(sel: Selection) {
        let cb = (id: ScheduleWidgetID): void => {
            this.mHtmlCells[id.row][id.col].element.classList.remove(
                CssSelection.BottomBorder,
                CssSelection.LeftBorder,
                CssSelection.RightBorder,
                CssSelection.Selected,
                CssSelection.TopBorder);
        }
        if (sel.isActive) {
            sel.allCells(cb);
        }
    }

    private selection_render_all(sel: Selection) {
        let that = this;
        sel.topRow((id) => that.mHtmlCells[id.row][id.col].element.classList.add(CssSelection.TopBorder, CssSelection.Selected));
        sel.bottomRow((id) => that.mHtmlCells[id.row][id.col].element.classList.add(CssSelection.BottomBorder, CssSelection.Selected));
        sel.rightCol((id) => that.mHtmlCells[id.row][id.col].element.classList.add(CssSelection.RightBorder, CssSelection.Selected));
        sel.leftCol((id) => that.mHtmlCells[id.row][id.col].element.classList.add(CssSelection.LeftBorder, CssSelection.Selected));
        sel.bodyOnly((id) => that.mHtmlCells[id.row][id.col].element.classList.add(CssSelection.Selected));
    }

    selection_setByRowCol(row: number, col: number): void {

    }

    selection_setByData(id: number, owner: DataView) {

    }

    selection_move(rows: number, cols: number): void {

    }

    selection_grow(rows: number, cols: number): void {
        this.selection_render_clear(this.mCurrentSelection);
        this.mCurrentSelection.grow(rows, cols);
        this.selection_render_all(this.mCurrentSelection);
    }

    selection_clear(): void {
        this.selection_render_clear(this.mCurrentSelection);
        this.mCurrentSelection.clear();
    }

    selection_click(id: ScheduleWidgetID, newClick:boolean) {
        this.selection_render_clear(this.mCurrentSelection);
        if (newClick) {
            this.mCurrentSelection.set(id.row, id.col);
            this.mHtmlCells[id.row][id.col].element.focus();
        }
        else {
            this.mCurrentSelection.click(id.row, id.col);
        }
        this.selection_render_all(this.mCurrentSelection);
    }


    getElementID(element: HTMLElement): ScheduleWidgetID {
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
        return {row: parseInt(element.getAttribute(SWAttributes.RowIndex)),
                col: parseInt(element.getAttribute(SWAttributes.ColIndex))};
    }

    getElementDetails(element: HTMLElement): ScheduleWidgetCellInfo {
        let id = this.getElementID(element);
        return {
            id : id,
            data: new Datum(element.textContent,
                this.mHtmlCells[id.row][id.col].id,
                this.mHtmlCells[id.row][id.col].owner)
        }
    }

    change(elementIds: ScheduleWidgetID[], values : string[]) : void {
        // Fire onchange event before writing to the element
        // If on change evnet returns no write then don't write to the element. The onchange handled it
        // Code not implemeneted yet, therefore just write the new value into the element.
        if( elementIds.length != values.length ) {
            console.log("Yo done fucked up.");
            return;
        }
        let that = this;
        elementIds.forEach( (value:ScheduleWidgetID, index:number) => {
                this.mHtmlCells[value.row][value.col].element.textContent = values[index];
        });
    }

    private onChange = (e: EventOnChange) : boolean => {
        if (!this.mOwnerToHtml.has(e.owner)) { return true;}

        let oMap = this.mOwnerToHtml.get(e.owner);
        let that = this;
        e.ids.forEach((value, index) => {
            if (oMap.has(value)) {
                oMap.get(value).element.textContent = e.values[index].toString();
            }
        });
        return true;
    }

    private register_owner(owner: DataView): Map<number, HtmlCell> {
        if (this.mOwnerToHtml.has(owner) == false) {
            let newMap = new Map<number, HtmlCell>();
            this.mOwnerToHtml.set(owner, newMap);
            if (owner.events) {
                owner.events.addListener(this.onChange);
            }
            return newMap;
        }
        return this.mOwnerToHtml.get(owner);
    }

    private clear_internals(): void {
        this.mOwnerToHtml = null;
        this.mOwnerToHtml = new Map<DataView, NumberToCell>();
        this.mHtmlCells = null;
    }



    render(layout : LayoutTable): void {
        // Emtpy the existing data structures
        this.clear_internals();

        let fragment = document.createDocumentFragment();
        let table = document.createElement("table");
        fragment.appendChild(table);
        let grid = layout.toGrid();

        this.mHtmlCells = new Array<Array<HtmlCell>>(grid.length);
        for (let rowIndex = 0; rowIndex < grid.length; ++rowIndex) {
            let tr = document.createElement("tr");
            let row = grid[rowIndex];
        
            this.mHtmlCells[rowIndex] = new Array<HtmlCell>(row.length);
            for (let colIndex = 0; colIndex < row.length; ++colIndex) {
                let cell = row[colIndex];
                if (!cell.isEmpty()) {
                    let tdType : string = cell.isHeader ? "th" : "td";
                    let td = document.createElement(tdType);
  
                    // Update the internal mapping
                    let htmlCell = new HtmlCell(td, cell.data);
                    this.register_owner(cell.data.owner).set(cell.data.id, htmlCell); //Could be made more efficent with cacheing
                    this.mHtmlCells[rowIndex][colIndex] = htmlCell;
                    // End internal mappings
                    
                    if (cell.rowspan > 1)
                        td.setAttribute(SWAttributes.Rowspan, cell.rowspan.toString());
                    if (cell.colspan > 1)
                        td.setAttribute(SWAttributes.Colspan, cell.colspan.toString());
                    if (cell.cssClasses.length > 0) {
                        cell.cssClasses.forEach((value: string) => { td.classList.add(value) });
                    }
                    
                    td.textContent = cell.data.value.toString();
                    this.configureElement(td, rowIndex, colIndex);
                    tr.appendChild(td);
                }
            }

            table.appendChild(tr);
        }
        this.mParentElement.appendChild(fragment);
        this.mRoot = <HTMLElement> this.mParentElement.lastChild;
        grid = null;

        // Currently a quick hack should make it ignore the header cells
        this.mCurrentSelection = new Selection(2,this.mHtmlCells.length,2,this.mHtmlCells[0].length)
    }
}