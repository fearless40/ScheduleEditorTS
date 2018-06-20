import { DataItem, DataView, DataValue } from "./Data.js"
import {EmptyOwner} from "./EmptyData.js"

export class ReadonlyDataItem implements DataItem {
    constructor(public readonly value: string) {

    }

    get id() {
        return 0;
    }

    get owner() {
        return EmptyOwner.EmptyOwner;
    }

}

/*class ReadonlyWithOwner implements DataTable.DataItem {
    value: DataTable.DataValue;
    readonly isReadOnly: boolean = true
    readonly id: number
    constructor(val: DataTable.DataValue, _id: number) {
        this.id = _id;
        this.value = val;
    }
}*/

export class Datum implements DataItem {
    constructor(public readonly value: DataValue, public readonly id: number, public readonly owner: DataView) {}
}