import { ScheduleWidget } from "../widgets/ScheduleWidget.js";
export class TableEditor {
    constructor(parentNode, layout) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
    }
    attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));
    }
    onClick(e) {
        let eId = this.mSchedule.getElementID(e.target);
        let eIds = [];
        eIds.push(eId);
        let values = [];
        values.push("yo");
        this.mSchedule.change(eIds, values);
    }
    show() {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}
//# sourceMappingURL=tableeditor.js.map