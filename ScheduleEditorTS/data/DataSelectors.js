export class GetSingleDataItem {
    constructor(datatabletowrap, idtoget) {
        this.mDT = datatabletowrap;
        this.mID = idtoget;
    }
    maxCountRows() {
        return 1;
    }
    maxCountCols() {
        return 1;
    }
    getById(id) {
        return this.mDT.getById(this.mID);
    }
    getRow(row) {
        return [this.getById(0)];
    }
}
export class GetSingleColumn {
    constructor(datatabletowrap, colstart, colend) {
        this.mDT = datatabletowrap;
        this.mColStart = colstart;
        colend = colend || colstart;
        this.mColEnd = colend + 1;
    }
    maxCountRows() {
        return this.mDT.maxCountRows();
    }
    maxCountCols() {
        return (this.mColEnd - this.mColStart);
    }
    getById(id) {
        return this.mDT.getById(id);
    }
    getRow(row) {
        return this.mDT.getRow(row).slice(this.mColStart, this.mColEnd);
    }
}
//# sourceMappingURL=DataSelectors.js.map