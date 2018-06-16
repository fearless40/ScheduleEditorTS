import { DataItem,EmptyDataItem } from "./DataTable.js"

export type Cell2d = Array<Array<Cell>>

export function MaxColumns(items: Cell2d): number {
    let maxCol = 0;
    for (let row of items) {
        maxCol = Math.max(row.length, maxCol);
    }
    return maxCol;
}



export const enum CellType {
    HeaderCell,
    BodyCell,
    FooterCell,
}


export class Cell {
    public rowspan: number
    public colspan: number
    public data: DataItem

    constructor(data: DataItem, rowspan: number = 1, colspan: number = 1) {
        this.rowspan = rowspan;
        this.colspan = colspan;
        this.data = data;
    }

    isEmpty(): boolean {
        return (this.rowspan <= 0 || this.colspan <= 0);
    }

    public static readonly EmptyCell = new Cell(EmptyDataItem.EmptyItem, -1, -1);

}


