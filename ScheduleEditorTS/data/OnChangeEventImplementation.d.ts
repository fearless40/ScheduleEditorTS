import { DataEvents, OnChange, DataValue } from "./Data.js";
export declare class OnChangeEventImplementation implements DataEvents {
    private mEventRecievers;
    constructor();
    fire(ids: number[], values: DataValue[]): void;
    addListener(cb: OnChange): void;
    removeListener(cb: OnChange): void;
}
