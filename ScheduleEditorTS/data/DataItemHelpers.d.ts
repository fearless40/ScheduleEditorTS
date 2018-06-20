import { DataItem, DataView, DataValue } from "./Data.js";
import { EmptyOwner } from "./EmptyData.js";
export declare class ReadonlyDataItem implements DataItem {
    readonly value: string;
    constructor(value: string);
    readonly id: number;
    readonly owner: EmptyOwner;
}
export declare class Datum implements DataItem {
    readonly value: DataValue;
    readonly id: number;
    readonly owner: DataView;
    constructor(value: DataValue, id: number, owner: DataView);
}
