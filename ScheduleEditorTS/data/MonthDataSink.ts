import * as DataTable from "../view/DataTable.js"
import { DataItem } from "../view/DataTable.js";

class MonthLabelDataItem implements DataTable.DataItem {
    constructor(public value: string, private mId : number) {

    }

    get isReadOnly() {
        return true;
    }

    get id() {
        return this.mId;
    }
    
}

export class MonthLabel implements DataTable.DataTable {
    constructor() {

    }
        
    maxCountRows(): number {
        return 1;
    }

    maxCountCols(): number {
        return 2;
    }

    getRow(rowIndex: number): Array<DataTable.DataItem> {
        return [this.getById(0), this.getById(1)]
    }

    getByRowCol(row: number, col: number): DataTable.DataItem {
        return
    }
    getById(dataID: number): DataTable.DataItem{
        switch (dataID) {
            case 0:
                return new MonthLabelDataItem("MonthLabel",0)
            case 1:
                return new MonthLabelDataItem("GRID",1)
        }
    }
    getOnChange(): DataTable.OnChange {
        return function (id: number[], valueNew: Array<DataTable.DataValue>, valueOld: Array<DataTable.DataValue>): boolean { return true; }
    }

    setOnChange(cb: DataTable.OnChange): DataTable.OnChangeToken {
        return {token:0}
    }

}

class MonthHeaderDataItem implements DataTable.DataItem {
    value: DataTable.DataValue;
    readonly isReadOnly: boolean = true
    readonly id: number
    constructor(val: DataTable.DataValue, _id: number) {
        this.id = _id;
        this.value = val;
    }
}

export class MonthHeader implements DataTable.DataTable  {

    private mRows: Array<Array<String>>;
    private mDate_Start: Date;
    private mDate_End: Date;

    constructor(month: number, year: number, showMonthHeaders: boolean = false) {
        this.mDate_Start = new Date(year, month, 1);
        this.mDate_End = new Date(year, month + 1, 0);
    }


    maxCountRows(): number {
         return 2;
    }

    maxCountCols(): number {
        return (this.mDate_End.getDate() - this.mDate_Start.getDate()) + 1; 
    }

    private extractRowFromID(id: number) : number {
        return id - (this.maxCountCols() * Math.floor(id / this.maxCountCols()));
    }

    getById(dataID: number): DataTable.DataItem {
        return new MonthHeaderDataItem(dataID, 0);
    }

    getOnChange(): DataTable.OnChange {
        return (function (id: number[], valueNew: DataTable.DataValue[], valueOld: DataTable.DataValue[]): boolean { return true;})
    }

    setOnChange(cb: DataTable.OnChange): DataTable.OnChangeToken {
        return { token: 0 };
    }

    getByRowCol(row: number, col: number): DataItem {
        return new MonthHeaderDataItem(col, 0);
    }

    getRow(rowIndex: number): Array<DataTable.DataItem> {
        if (rowIndex > this.maxCountRows()) {
            return [];
        }

        let ret = [];
        ret.length = this.maxCountCols();

        switch (rowIndex) {
            case 0:
                for (let i = 0; i < this.maxCountCols(); ++i) {
                    ret[i] = new MonthHeaderDataItem(i+1, rowIndex * this.maxCountCols() + i)
                }
                break;
            case 1:
                for (let i = 0; i < this.maxCountCols(); ++i) {
                    let dt = new Date(this.mDate_Start);
                    dt.setDate(i+1);
                    ret[i] = new MonthHeaderDataItem(dt.toLocaleDateString("en", { weekday: "narrow" }), rowIndex * this.maxCountCols() + i)
                }
                break;
        }
   
        return ret;
    }
}

