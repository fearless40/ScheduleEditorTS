export class EventSimple {
    constructor() {
        this.mCallBacks = new Set();
    }
    addListener(callback) {
        this.mCallBacks.add(callback);
    }
    removeListener(callback) {
        this.mCallBacks.delete(callback);
    }
    fire(argument) {
        this.mCallBacks.forEach((value) => value(argument));
    }
}
//# sourceMappingURL=EventSimple.js.map