import {ScheduleWidget, ScheduleWidgetID} from "../widgets/ScheduleWidget.js";
import { LayoutTable } from "../view/TableLayout.js"
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";

export class TableEditor {
    private mSchedule : ScheduleWidget;
    private mLayout: LayoutTable;
    private mFloat: FloatingTextInput;

    constructor(parentNode : HTMLElement, layout : LayoutTable) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }

    private attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));       
    }

    private onClick(e : any) {
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

    show() : void {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}