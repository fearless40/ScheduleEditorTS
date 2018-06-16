import { LayoutTable } from "../view/TableLayout.js";

class ColItem {
    constructor() {}
    node: HTMLElement
    value: string = ""
    rowspan: number = 0
    colspan: number = 0
    isEmpty:boolean = true
}

export class TableRender {
    private mParentElement: Node
    private mLayout: LayoutTable

    constructor(parent: Node, layout: LayoutTable ) {
        this.mParentElement = parent;
        this.mLayout = layout;
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
                    let td = document.createElement("td");
                    if (cell.rowspan > 1)
                        td.setAttribute("rowspan", cell.rowspan.toString());
                    if (cell.colspan > 1)
                        td.setAttribute("colspan", cell.colspan.toString());

                    td.textContent = cell.data.value.toString();

                    tr.appendChild(td);
                }
            }

            table.appendChild(tr);
        }
        this.mParentElement.appendChild(fragment);
    }
}