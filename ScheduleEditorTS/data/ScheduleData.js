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
        return 32;
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
    modify(ids, values) {
        return { isOk: true };
    }
}
//# sourceMappingURL=ScheduleData.js.map