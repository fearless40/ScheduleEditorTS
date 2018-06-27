import { LayoutTable } from "../view/TableLayout.js";
import { DataItem, DataView } from "../data/Data.js";

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

export interface ScheduleWidgetID {
    row: number
    col: number
};

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
    
export class ScheduleWidget {
    
    
    private mParentElement: Node
    private mIDPrefix : string
    private mHtmlCells: HTMLCells;
    private mRoot: HTMLElement;

    constructor(parent: Node) {
        this.mParentElement = parent;
        this.mIDPrefix = "Table";
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

    getElementID(element : HTMLElement) : ScheduleWidgetID {
        return {row: parseInt(element.getAttribute(SWAttributes.RowIndex)),
                col: parseInt(element.getAttribute(SWAttributes.ColIndex))};
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

    render(layout : LayoutTable): void {
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
                    this.mHtmlCells[rowIndex][colIndex] = htmlCell;
                    
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
    }
}