export class TableRange {
    constructor(row_start, row_end, col_start, col_end) {
        this.row_start = row_start;
        this.row_end = row_end;
        this.col_start = col_start;
        this.col_end = col_end;
    }
    isEmpty() {
        return (this.row_start < 0 || this.row_end < 0 || this.col_end < 0 || this.col_start < 0);
    }
    forEach(cb) {
        for (let r = this.row_start; r <= this.row_end; ++r) {
            for (let c = this.col_start; c <= this.col_end; ++c) {
                cb(r, c);
            }
        }
    }
}
//# sourceMappingURL=Helpers.js.map