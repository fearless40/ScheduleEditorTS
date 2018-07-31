import {EventSimple} from "../util/EventSimple.js"

export type DataValue = string | number

export const enum DataChangedBy {
    User,
    Software,
    DB,
}

export interface onChangeResults {
    isOk: boolean
    errors?: {
        ids: number[]
        reason: string[]
        value: DataValue[]
    }
}

export interface EventOnChange {
    owner: DataView;
    ids: number[];
    values: DataValue[];
    who: DataChangedBy[];
}

export interface DataItem {
    readonly value: DataValue;
    readonly id: number
    readonly owner: DataView;
}

export interface DataView {
    getById(dataID: number): DataItem
    modify?(ids: number[], values: DataValue[]): onChangeResults
    events?: EventSimple<EventOnChange>;
}

export interface DataTable extends DataView{
   maxCountRows(): number
   maxCountCols(): number
   getRow(rowIndex: number): Array<DataItem>
   // getByRowCol(row : number, col : number ) : DataItem
}


export class NullOwner implements DataView {
    getById(dataID: number): DataItem {
        return NullDataItem.NullDataItem;
    }

    public static readonly NullOwner = new NullOwner();
}

export class NullDataItem implements DataItem {
    readonly value: string = "";
    readonly owner = NullOwner.NullOwner;
    readonly id: number = 0

    public static readonly NullDataItem = new NullDataItem();
}



