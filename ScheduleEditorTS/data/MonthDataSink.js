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
    }
    maxCountRows() {
        return 2;
    }
    maxCountCols() {
        return (this.mDate_End.getDate() - this.mDate_Start.getDate()) + 1;
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
        switch (rowIndex) {
            case 0:
                for (let i = 0; i < this.maxCountCols(); ++i) {
                    ret[i] = new MonthHeaderDataItem(i + 1, rowIndex * this.maxCountCols() + i);
                }
                break;
            case 1:
                for (let i = 0; i < this.maxCountCols(); ++i) {
                    let dt = new Date(this.mDate_Start);
                    dt.setDate(i + 1);
                    ret[i] = new MonthHeaderDataItem(dt.toLocaleDateString("en", { weekday: "narrow" }), rowIndex * this.maxCountCols() + i);
                }
                break;
        }
        return ret;
    }
}
//# sourceMappingURL=MonthDataSink.js.map