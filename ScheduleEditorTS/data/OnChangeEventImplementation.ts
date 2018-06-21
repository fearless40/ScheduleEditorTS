import { DataEvents, OnChange, DataValue} from "./Data.js"

export class OnChangeEventImplementation implements DataEvents {
    private mEventRecievers: Set<OnChange>;

    constructor() {
        this.mEventRecievers = new Set<OnChange>();
    }

    fire(ids: number[], values: DataValue[]) {
        this.mEventRecievers.forEach((fn) => { fn(ids, values); });
    }

    addListener(cb: OnChange): void {
        this.mEventRecievers.add(cb);
    }
    removeListener(cb: OnChange): void {
        this.mEventRecievers.delete(cb);
    }
}
