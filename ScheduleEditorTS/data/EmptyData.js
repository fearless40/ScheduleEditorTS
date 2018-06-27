export class EmptyOwner {
    getById(dataID) {
        return EmptyDataItem.EmptyItem;
    }
}
EmptyOwner.EmptyOwner = new EmptyOwner();
export class EmptyDataItem {
    constructor() {
        this.value = "";
        this.owner = EmptyOwner.EmptyOwner;
        this.id = 0;
    }
}
EmptyDataItem.EmptyItem = new EmptyDataItem();
//# sourceMappingURL=EmptyData.js.map