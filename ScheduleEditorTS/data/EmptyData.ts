import {DataItem, DataView} from "./Data"


export class EmptyOwner implements DataView {
    getById(dataID: number): DataItem {
        return EmptyDataItem.EmptyItem;
    }

    public static readonly EmptyOwner = new EmptyOwner();
}

export class EmptyDataItem implements DataItem {
    readonly value: string = "";
    readonly owner = EmptyOwner.EmptyOwner;
    readonly id: number = 0

    public static readonly EmptyItem = new EmptyDataItem();
}

