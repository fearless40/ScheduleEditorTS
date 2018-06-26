import { LayoutTable } from "../view/TableLayout.js";

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

export class ScheduleWidget {
    private mParentElement: Node
    private mLayout: LayoutTable
    private mIDPrefix : string

    constructor(parent: Node, layout: LayoutTable ) {
        this.mParentElement = parent;
        this.mLayout = layout;
        this.mIDPrefix = "Table";
    }

    private makeIDForCell(rowIndex:number, colIndex:number) : string {
        return this.mIDPrefix + "_" + rowIndex.toString() + "_" + colIndex.toString();
    }

    private configureCell(element : HTMLElement, rowIndex : number, colIndex : number) {
        
    }

    update(elementId: number[], values : string[]) : void {
        
    }

    render(): void {
        let fragment = document.createDocumentFragment();
        let table = document.createElement("table");
        fragment.appendChild(table);
        let grid = this.mLayout.toGrid();
        for (let rowIndex = 0; rowIndex < grid.length; ++rowIndex) {
            let tr = document.createElement("tr");
            let row = grid[rowIndex];
            for (let colIndex = 0; colIndex < row.length; ++colIndex) {
                let cell = row[colIndex];
                if (!cell.isEmpty()) {
                    let tdType : string = cell.isHeader ? "th" : "td";
                    let td = document.createElement(tdType);
                    if (cell.rowspan > 1)
                        td.setAttribute(SWAttributes.Rowspan, cell.rowspan.toString());
                    if (cell.colspan > 1)
                        td.setAttribute(SWAttributes.Colspan, cell.colspan.toString());
                    if (cell.cssClasses.length > 0) {
                        cell.cssClasses.forEach((value: string) => { td.classList.add(value) });
                    }


                    td.textContent = cell.data.value.toString();

                    tr.appendChild(td);
                }
            }

            table.appendChild(tr);
        }
        this.mParentElement.appendChild(fragment);
    }
}