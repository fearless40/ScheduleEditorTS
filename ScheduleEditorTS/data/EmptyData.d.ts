import { DataItem, DataView } from "./Data";
export declare class EmptyOwner implements DataView {
    getById(dataID: number): DataItem;
    static readonly EmptyOwner: EmptyOwner;
}
export declare class EmptyDataItem implements DataItem {
    readonly value: string;
    readonly owner: EmptyOwner;
    readonly id: number;
    static readonly EmptyItem: EmptyDataItem;
}
