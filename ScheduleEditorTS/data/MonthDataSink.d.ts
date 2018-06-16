import * as DataTable from "../view/DataTable.js";
import { DataItem } from "../view/DataTable.js";
export declare class MonthLabel implements DataTable.DataTable {
    constructor();
    maxCountRows(): number;
    maxCountCols(): number;
    getRow(rowIndex: number): Array<DataTable.DataItem>;
    getByRowCol(row: number, col: number): DataTable.DataItem;
    getById(dataID: number): DataTable.DataItem;
    getOnChange(): DataTable.OnChange;
    setOnChange(cb: DataTable.OnChange): DataTable.OnChangeToken;
}
export declare class MonthHeader implements DataTable.DataTable {
    private mRows;
    private mDate_Start;
    private mDate_End;
    constructor(month: number, year: number, showMonthHeaders?: boolean);
    maxCountRows(): number;
    maxCountCols(): number;
    private extractRowFromID(id);
    getById(dataID: number): DataTable.DataItem;
    getOnChange(): DataTable.OnChange;
    setOnChange(cb: DataTable.OnChange): DataTable.OnChangeToken;
    getByRowCol(row: number, col: number): DataItem;
    getRow(rowIndex: number): Array<DataTable.DataItem>;
}
