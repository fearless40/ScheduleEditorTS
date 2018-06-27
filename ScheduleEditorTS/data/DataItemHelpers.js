import { EmptyOwner } from "./EmptyData.js";
export class ReadonlyDataItem {
    constructor(value) {
        this.value = value;
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
export class Datum {
    constructor(value, id, owner) {
        this.value = value;
        this.id = id;
        this.owner = owner;
    }
}
//# sourceMappingURL=DataItemHelpers.js.map