import { Datum } from "./DataItemHelpers.js";
import { EventSimple } from "../util/EventSimple.js";
class RowCol {
}
export class ScheduleSlotData {
    constructor() {
        this.mOwner = "Spivack";
        this.events = new EventSimple();
        this.generateData();
    }
    generateData() {
        let slots = ["7am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm"];
        this.mData = new Array();
        for (let row = 0; row < this.maxCountRows(); ++row) {
            this.mData[row] = new Array();
            let thisRow = this.mData[row];
            for (let col = 0; col < this.maxCountCols(); ++col) {
                switch (col) {
                    case 0:
                        thisRow.push(slots[col]);
                        break;
                    case 4:
                        thisRow.push("asn");
                        break;
                    case 5:
                        if (row > 2) {
                            thisRow.push("cl");
                        }
                        else {
                            thisRow.push("ir");
                        }
                        break;
                    default:
                        thisRow.push("");
                }
            }
        }
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
        return 15;
    }
    getRow(rowIndex) {
        let ret = [];
        // Error check
        if (rowIndex >= this.maxCountRows() || rowIndex < 0)
            return ret;
        let that = this;
        ret = this.mData[rowIndex].map((value, index) => {
            return new Datum(value, this.makeId(rowIndex, index), that);
        });
        return ret;
    }
    getById(dataID) {
        if (dataID < 0) {
            switch (dataID) {
                case -1:
                    return new Datum("Spivack", -1, this);
            }
        }
        else {
            let rc = this.extractRowCol(dataID);
            return new Datum(this.mData[rc.row][rc.col], dataID, this);
        }
    }
    value_change(id, value) {
        const rc = this.extractRowCol(id);
        if (rc.row > this.maxCountRows() || rc.row < 0) {
            return false;
        }
        if (rc.col > this.maxCountCols() || rc.col < 0) {
            return false;
        }
        this.mData[rc.row][rc.col] = value.toString();
        return true;
    }
    modify(ids, values) {
        let retids = new Array();
        let retvalues = new Array();
        for (let i = 0; i < ids.length; ++i) {
            if (this.value_change(ids[i], values[i])) {
                retids.push(ids[i]);
                retvalues.push(values[i]);
            }
        }
        this.events.fire({
            owner: this,
            ids: retids,
            values: retvalues,
            who: [0 /* User */]
        });
        return { isOk: true };
    }
}
//# sourceMappingURL=ScheduleData.js.map