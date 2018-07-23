import { ReadonlyDataItem } from "./DataItemHelpers.js";
import { MonthHelper } from "../util/DateHelper.js";
export class MonthLabel {
    constructor(month) {
        this.month = month;
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
                let d = new Date();
                d.setMonth(this.month - 1);
                return new ReadonlyDataItem(d.toLocaleDateString("en", { month: "long", year: "numeric" }));
            case 1:
                return new ReadonlyDataItem("GRID");
        }
    }
}
export class MonthDaysLabels {
    constructor(month, year, fmt) {
        this.fmt = fmt;
        this.monthInfo = new MonthHelper(month, year);
    }
    maxCountRows() {
        return 1;
    }
    maxCountCols() {
        return this.monthInfo.days_count;
    }
    getById(id) {
        switch (this.fmt) {
            case 0 /* Number */:
                return new ReadonlyDataItem(id.toString());
            case 1 /* ShortText */:
                return new ReadonlyDataItem(this.monthInfo.day_name_short(id));
            case 2 /* LongText */:
                return new ReadonlyDataItem(this.monthInfo.day_name_long(id));
        }
    }
    getRow(rowIndex) {
        if (rowIndex != 0) {
            return [];
        }
        let ret = new Array(this.maxCountCols());
        for (let i = 0; i < this.monthInfo.days_count; ++i) {
            ret[i] = this.getById(i + 1);
        }
        return ret;
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
        let ret = new Array(this.maxCountCols());
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