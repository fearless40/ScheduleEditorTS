import {ScheduleWidget, ScheduleWidgetID} from "../widgets/ScheduleWidget.js";
import {LayoutTable} from "../view/TableLayout.js"

export class TableEditor {
    private mSchedule : ScheduleWidget;
    private mLayout: LayoutTable;

    constructor(parentNode : HTMLElement, layout : LayoutTable) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
    }

    private attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));       
    }

    private onClick(e : any) {
        let eId = this.mSchedule.getElementID(e.target);
        let eIds = [];
        eIds.push(eId);
        let values = [];
        values.push("yo");
        this.mSchedule.change(eIds,values);
    }

    show() : void {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}