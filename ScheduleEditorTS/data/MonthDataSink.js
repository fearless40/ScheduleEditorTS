class MonthLabelDataItem {
    constructor(value, mId) {
        this.value = value;
        this.mId = mId;
    }
    get isReadOnly() {
        return true;
    }
    get id() {
        return this.mId;
    }
}
export class MonthLabel {
    constructor() {
    }
    maxCountRows() {
        return 1;
    }
    maxCountCols() {
        return 2;
    }
    getRow(rowIndex) {
        return [this.getById(0), this.getById(1)];
    }
    getByRowCol(row, col) {
        return;
    }
    getById(dataID) {
        switch (dataID) {
            case 0:
                return new MonthLabelDataItem("MonthLabel", 0);
            case 1:
                return new MonthLabelDataItem("GRID", 1);
        }
    }
    getOnChange() {
        return function (id, valueNew, valueOld) { return true; };
    }
    setOnChange(cb) {
        return { token: 0 };
    }
}
class MonthHeaderDataItem {
    constructor(val, _id) {
        this.isReadOnly = true;
        this.id = _id;
        this.value = val;
    }
}
export class MonthHeader {
    constructor(month, year, showMonthHeaders = false) {
        this.mDate_Start = new Date(year, month, 1);
        this.mDate_End = new Date(year, month + 1, 0);
        this.mMonthHeader = showMonthHeaders;
        let row = [];
        for (let i = 1; i < 32; ++i) {
            row[i - 1] = i.toString();
        }
    }
    maxCountRows() {
        if (this.mMonthHeader) {
            return 3;
        }
        else {
            return 2;
        }
    }
    maxCountCols() {
        return 31; //todo fix this
    }
    extractRowFromID(id) {
        return id - (this.maxCountCols() * Math.floor(id / this.maxCountCols()));
    }
    getById(dataID) {
        return new MonthHeaderDataItem(dataID, 0);
    }
    getOnChange() {
        return (function (id, valueNew, valueOld) { return true; });
    }
    setOnChange(cb) {
        return { token: 0 };
    }
    getByRowCol(row, col) {
        return new MonthHeaderDataItem(col, 0);
    }
    getRow(rowIndex) {
        if (rowIndex > this.maxCountRows()) {
            return [];
        }
        let ret = [];
        ret.length = this.maxCountCols();
        for (let i = 0; i < this.maxCountCols(); ++i) {
            ret[i] = new MonthHeaderDataItem(i, rowIndex * this.maxCountCols() + i);
        }
        return ret;
    }
}
//# sourceMappingURL=MonthDataSink.js.map