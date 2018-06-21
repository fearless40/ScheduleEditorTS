import { DataTable, DataItem } from "./Data";
export declare class GetSingleDataItem implements DataTable {
    private mDT;
    private mID;
    constructor(datatabletowrap: DataTable, idtoget: number);
    maxCountRows(): number;
    maxCountCols(): number;
    getById(id: number): DataItem;
    getRow(row: number): DataItem[];
}
export declare class LimitColumns implements DataTable {
    private mDT;
    private mColStart;
    private mColEnd;
    constructor(datatabletowrap: DataTable, colstart: number, colend?: number);
    maxCountRows(): number;
    maxCountCols(): number;
    getById(id: number): DataItem;
    getRow(row: number): DataItem[];
}
