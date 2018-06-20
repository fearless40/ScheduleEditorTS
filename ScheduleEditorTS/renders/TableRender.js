class ColItem {
    constructor() {
        this.value = "";
        this.rowspan = 0;
        this.colspan = 0;
        this.isEmpty = true;
    }
}
export class TableRender {
    constructor(parent, layout) {
        this.mParentElement = parent;
        this.mLayout = layout;
    }
    render() {
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
                    if (cell.cssClasses.length > 0) {
                        cell.cssClasses.forEach((value) => { td.classList.add(value); });
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
//# sourceMappingURL=TableRender.js.map