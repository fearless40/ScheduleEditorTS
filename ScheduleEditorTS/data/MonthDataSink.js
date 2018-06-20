import { ReadonlyDataItem } from "./DataItemHelpers.js";
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
    getById(dataID) {
        switch (dataID) {
            case 0:
                return new ReadonlyDataItem("MonthLabel");
            case 1:
                return new ReadonlyDataItem("GRID");
        }
    }
}
export class MonthHeader {
    constructor(month, year) {
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
        return new ReadonlyDataItem(dataID.toString());
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
                    ret[i] = new ReadonlyDataItem((i + 1).toString());
                }
                break;
            case 1:
                for (let i = 0; i < this.maxCountCols(); ++i) {
                    let dt = new Date(this.mDate_Start);
                    dt.setDate(i + 1);
                    ret[i] = new ReadonlyDataItem(dt.toLocaleDateString("en", { weekday: "narrow" }));
                }
                break;
        }
        return ret;
    }
}
//# sourceMappingURL=MonthDataSink.js.map