import { ScheduleWidget } from "../widgets/ScheduleWidget.js";
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";
export class TableEditor {
    constructor(parentNode, layout) {
        this.onDragStart = (e) => {
            this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), true);
            this.mSelecting = true;
            e.preventDefault();
        };
        this.onDrag = (e) => {
            if (this.mSelecting) {
                this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
            }
            e.preventDefault();
        };
        this.onDragEnd = (e) => {
            this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
            this.mSelecting = false;
            //e.preventDefault();
        };
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }
    attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));
        this.mSchedule.root.addEventListener('mousedown', this.onDragStart);
        this.mSchedule.root.addEventListener('mousemove', this.onDrag);
        this.mSchedule.root.addEventListener('mouseup', this.onDragEnd);
    }
    onClick(e) {
        //this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target))
        // this.mFloat.hide();
        // let cell = this.mSchedule.getElementDetails(e.target);
        // this.mFloat.show(e.target, cell.data.value.toString());
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