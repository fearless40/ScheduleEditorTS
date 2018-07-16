export class TableRange {
    constructor(public row_start: number, public row_end: number,
        public col_start: number, public col_end: number) { }

    isEmpty(): boolean {
        return (this.row_start < 0 || this.row_end < 0 || this.col_end < 0 || this.col_start < 0)
    }
}