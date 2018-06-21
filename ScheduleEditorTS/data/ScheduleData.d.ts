import { DataTable, DataItem, DataEvents, DataValue, onChangeResults } from "./Data.js";
export declare const enum ScheduleSlotSpecialValues {
    ScheduleOwnerName = -1,
}
export declare class ScheduleSlotData implements DataTable {
    private mDateStart;
    private mDateEnd;
    private mOwner;
    private mData;
    private generateData();
    constructor();
    private makeId(row, col);
    private extractRowCol(id);
    maxCountRows(): number;
    maxCountCols(): number;
    getRow(rowIndex: number): Array<DataItem>;
    getById(dataID: number): DataItem;
    modify(ids: number[], values: DataValue[]): onChangeResults;
    readonly events: DataEvents;
}
