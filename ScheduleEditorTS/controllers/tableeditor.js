import { ScheduleWidget } from "../widgets/ScheduleWidget.js";
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";
export class TableEditor {
    constructor(parentNode, layout) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }
    attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));
    }
    onClick(e) {
        this.mFloat.hide();
        let cell = this.mSchedule.getElementDetails(e.target);
        this.mFloat.show(e.target, cell.data.value.toString());
        /*let eId = this.mSchedule.getElementID(e.target);
        let eIds = [];
        eIds.push(eId);
        let values = [];
        values.push("yo");
        this.mSchedule.change(eIds,values);*/
    }
    show() {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}
//# sourceMappingURL=TableEditor.js.map