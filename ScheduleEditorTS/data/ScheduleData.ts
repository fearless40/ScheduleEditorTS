import {DataTable, DataItem, DataEvents, DataValue, onChangeResults, OnChange, OnChangeToken} from "./Data.js"
import { Datum } from "./DataItemHelpers.js"
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

class ScheduleEvents implements DataEvents {
    constructor(private mOwner: ScheduleSlotData) { }

    onChange(ids: number[], values: DataValue[]): onChangeResults {
        return this.mOwner.edit(ids, values);
    //More logic goes here such as fire the event listner and such
    }
    listen(cb: OnChange): OnChangeToken {
        return {token:0}
    }
    removeListener(token: OnChangeToken): void {

    }
}

export class ScheduleSlotData implements DataTable{
    private mDateStart: Date
    private mDateEnd: Date
    private mOwner: string = "Spivack";

    constructor() {
        this.events = new ScheduleEvents(this);
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
    getById(dataID: number): DataItem {
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

    public edit(ids: number[], values: DataValue[]): onChangeResults {
        return {isOk: true}
    }

    readonly events: DataEvents
    
} 