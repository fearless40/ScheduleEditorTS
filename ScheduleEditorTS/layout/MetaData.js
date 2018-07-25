import { TableRange } from "./Helpers.js";
export function SearchForPseudoElements(values) {
    let ret = new Set();
    for (let row = 0; row < values.length; ++row) {
        for (let col = 0; col < values[0].length; ++col) {
            let c = values[row][col];
            if (c instanceof CellMarked) {
                c.marks.forEach((value) => {
                    if (value.position == 0 /* Start */) {
                        value.owner.range.row_start = row;
                        value.owner.range.col_start = col;
                    }
                    else {
                        value.owner.range.row_end = row;
                        value.owner.range.col_end = col;
                        ret.add(value.owner);
                    }
                });
            }
        }
    }
    return ret;
}
export class CellMarked {
    constructor(cell, markerPosition, markOwner) {
        this.cssClasses = [];
        this.rowspan = cell.rowspan;
        this.colspan = cell.colspan;
        this.data = cell.data;
        this.isReadOnly = cell.isReadOnly;
        this.cssClasses = cell.cssClasses;
        if (cell instanceof CellMarked) {
            this.marks = cell.marks;
        }
        else {
            this.marks = [];
        }
        this.marks.push({ position: markerPosition, owner: markOwner });
    }
    isEmpty() {
        return (this.rowspan <= 0 || this.colspan <= 0);
    }
}
export class MetaItem {
    constructor(item, layoutType) {
        this.item = item;
        this.layoutType = layoutType;
        this.range = new TableRange(-1, -1, -1, -1);
    }
    get type() {
        return this.layoutType;
    }
    toGrid() {
        const values = this.item.toGrid();
        values[0][0] = new CellMarked(values[0][0], 0 /* Start */, this);
        const lastRow = values.length - 1;
        const lastCol = values[0].length - 1;
        values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], 1 /* End */, this);
        return values;
    }
}
//# sourceMappingURL=MetaData.js.map