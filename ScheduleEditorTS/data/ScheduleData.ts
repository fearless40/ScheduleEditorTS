﻿import { DataTable, DataItem, DataValue, onChangeResults, DataChangedBy, EventOnChange} from "./Data.js"
import { Datum } from "./DataItemHelpers.js"
import {EventSimple} from "../util/EventSimple.js"
/*
 * ScheduleData event chain
 * If user modifies a value:
 * In the controller only
 *  1. Send it to Verifyier -> Accepts or stops event
 *  2. Send it to AutoFiller -> Increase the number of items filled out
 * Controller aggregates changes and sends out a DB.OnChanged event
 *  3. Send it DB
 *  4. DB broadcasts it changed
 *  5. Widget / Controller gets changed message and updates its view
 *  6. Anything else that is currently depending on the data gets notified also
 *  
 */

export const enum ScheduleSlotSpecialValues {
    ScheduleOwnerName = -1,
}

class RowCol {
    row: number
    col: number
}

export class ScheduleSlotData implements DataTable{
    private mDateStart: Date
    private mDateEnd: Date
    private mOwner: string = "Spivack";
    private mData: Array<Array<string>>;

    private generateData() : void {
        let slots = ["7am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm"];
        this.mData = new Array<Array<string>>();
        for (let row = 0; row < this.maxCountRows(); ++row) {
            this.mData[row] = new Array<string>();
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


    constructor() {
        this.events = new EventSimple<EventOnChange>();
        this.generateData();
    }

    private makeId(row: number, col: number): number {
        return row * this.maxCountCols() + col;
    }

    private extractRowCol(id: number): RowCol {
        let ret = new RowCol();
        ret.row = Math.floor(id / this.maxCountCols());
        ret.col = id - ret.row * this.maxCountCols();
        return ret;
    }

    maxCountRows(): number {
        return 4;
    }

    maxCountCols(): number {
        return 32;
    }

    getRow(rowIndex: number): Array<DataItem> {
        let ret: DataItem[] = [];
        // Error check
        if (rowIndex >= this.maxCountRows() || rowIndex < 0) return ret;
        let that = this;

        ret = this.mData[rowIndex].map((value, index) => {
            return new Datum(value, this.makeId(rowIndex, index), that);
        });

        return ret;
    }

    getById(dataID: number): DataItem {
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
    
    public modify(ids: number[], values: DataValue[]): onChangeResults {
        return {isOk: true}
    }

    readonly events: EventSimple<EventOnChange>
    
} 