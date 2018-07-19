import { EmptyDataItem } from "../data/EmptyData.js";
export function MaxColumns(items) {
    let maxCol = 0;
    for (let row of items) {
        maxCol = Math.max(row.length, maxCol);
    }
    return maxCol;
}
export class CellSimple {
    constructor(data, rowspan = 1, colspan = 1) {
        this.cssClasses = [];
        this.rowspan = rowspan;
        this.colspan = colspan;
        this.data = data;
    }
    isEmpty() {
        return (this.rowspan <= 0 || this.colspan <= 0);
    }
}
CellSimple.EmptyCell = new CellSimple(EmptyDataItem.EmptyItem, -1, -1);
//# sourceMappingURL=Cell.js.map