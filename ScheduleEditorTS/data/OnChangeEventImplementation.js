export class OnChangeEventImplementation {
    constructor() {
        this.mEventRecievers = new Set();
    }
    fire(ids, values) {
        this.mEventRecievers.forEach((fn) => { fn(ids, values); });
    }
    addListener(cb) {
        this.mEventRecievers.add(cb);
    }
    removeListener(cb) {
        this.mEventRecievers.delete(cb);
    }
}
//# sourceMappingURL=OnChangeEventImplementation.js.map