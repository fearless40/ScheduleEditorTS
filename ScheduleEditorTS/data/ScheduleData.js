import { Datum } from "./DataItemHelpers.js";
class RowCol {
}
class ScheduleEvents {
    constructor(mOwner) {
        this.mOwner = mOwner;
    }
    onChange(ids, values) {
        return this.mOwner.edit(ids, values);
        //More logic goes here such as fire the event listner and such
    }
    listen(cb) {
        return { token: 0 };
    }
    removeListener(token) {
    }
}
export class ScheduleSlotData {
    constructor() {
        this.mOwner = "Spivack";
        this.events = new ScheduleEvents(this);
    }
    makeId(row, col) {
        return row * this.maxCountCols() + col;
    }
    extractRowCol(id) {
        let ret = new RowCol();
        ret.row = Math.floor(id / this.maxCountCols());
        ret.col = id - ret.row * this.maxCountCols();
        return ret;
    }
    maxCountRows() {
        return 4;
    }
    maxCountCols() {
        return 32;
    }
    getRow(rowIndex) {
        let ret = [];
        // Error check
        if (rowIndex >= this.maxCountRows() || rowIndex < 0)
            return ret;
        let slots = ["7am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm"];
        for (let col = 0; col < this.maxCountCols(); ++col) {
            switch (col) {
                case 0:
                    ret.push(new Datum(slots[rowIndex], this.makeId(rowIndex, col), this));
                    break;
                case 4:
                    ret.push(new Datum("asn", this.makeId(rowIndex, col), this));
                    break;
                case 5:
                    if (rowIndex > 2) {
                        ret.push(new Datum("cl", this.makeId(rowIndex, col), this));
                    }
                    else {
                        ret.push(new Datum("ir", this.makeId(rowIndex, col), this));
                    }
                    break;
                default:
                    ret.push(new Datum("", this.makeId(rowIndex, col), this));
            }
        }
        return ret;
    }
    getById(dataID) {
        if (dataID < 0) {
            switch (dataID) {
                case -1:
                    return new Datum("Spivack", -1, this);
            }
        }
        // Very inefficnet code but I am not storing anything so I don't care at this time. WIll fix it int ehfuture
        let rc = this.extractRowCol(dataID);
        return this.getRow(rc.row)[rc.col];
    }
    edit(ids, values) {
        return { isOk: true };
    }
}
//# sourceMappingURL=ScheduleData.js.map