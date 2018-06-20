import { DataTable, DataItem } from "./Data.js";
export declare class MonthLabel implements DataTable {
    constructor();
    maxCountRows(): number;
    maxCountCols(): number;
    getRow(rowIndex: number): Array<DataItem>;
    getById(dataID: number): DataItem;
}
export declare class MonthHeader implements DataTable {
    private mRows;
    private mDate_Start;
    private mDate_End;
    constructor(month: number, year: number);
    maxCountRows(): number;
    maxCountCols(): number;
    private extractRowFromID(id);
    getById(dataID: number): DataItem;
    getRow(rowIndex: number): Array<DataItem>;
}
