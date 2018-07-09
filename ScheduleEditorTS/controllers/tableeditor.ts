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
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    private onKeyDownSelection(e: KeyboardEvent): void {
        let advanceBy = 1;
        if (e.ctrlKey) {
            advanceBy = 5;
        }

        switch (e.code) {
            case 'ArrowDown':
                this.mSchedule.selection_grow(advanceBy, 0);
                break;

            case 'ArrowLeft':
                this.mSchedule.selection_grow(0, -advanceBy);
                break;

            case 'ArrowRight':
                this.mSchedule.selection_grow(0, advanceBy);
                break;

            case 'ArrowUp':
                this.mSchedule.selection_grow(-advanceBy, 0);
                break;
        }
    }


    private onKeyDown = (e: KeyboardEvent): void => {
        if (e.shiftKey) {
            this.onKeyDownSelection(e);
            return;
        }
    }

    private onKeyUp = (e: Event): void => {

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
        let cell = this.mSchedule.getElementDetails(e.target);
        this.mSchedule.selection_click(cell.id, true);
        
        //this.mFloat.show(e.target, cell.data.value.toString());
    }

    show() : void {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}