import {ScheduleWidget, ScheduleWidgetID} from "../widgets/ScheduleWidget.js";
import { LayoutTable } from "../view/TableLayout.js"
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";

export class TableEditor {
    private mSchedule : ScheduleWidget;
    private mLayout: LayoutTable;
    private mFloat: FloatingTextInput;
    private mSelecting: boolean

    constructor(parentNode : HTMLElement, layout : LayoutTable) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }

    private attach() {
        this.mSchedule.root.addEventListener('click', (e) => this.onClick(e));       
        this.mSchedule.root.addEventListener('mousedown', this.onDragStart);
        this.mSchedule.root.addEventListener('mousemove', this.onDrag);
        this.mSchedule.root.addEventListener('mouseup', this.onDragEnd);
    }

    private onDragStart = (e: Event): void => {
        this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target), true)
        this.mSelecting = true;
        e.preventDefault();
    }
    private onDrag = (e: Event): void => {
        if (this.mSelecting) {
            this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target), false)
        }
        e.preventDefault();
    }
    private onDragEnd = (e: Event): void => {
        this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target), false)
        this.mSelecting = false;
        //e.preventDefault();
    }

    private onClick(e : any) {
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

    show() : void {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}