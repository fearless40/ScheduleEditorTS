import {ScheduleWidget, ScheduleWidgetID, ScheduleCellID} from "../widgets/ScheduleWidget.js";
import { LayoutTable } from "../view/TableLayout.js"
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";
import { Cell } from "../view/Cell.js";

export class TableEditor {
    private mSchedule : ScheduleWidget;
    private mLayout: LayoutTable;
    private mFloat: FloatingTextInput;
    private mSelecting: boolean;
    private cellEdit: boolean;

    constructor(parentNode : HTMLElement, layout : LayoutTable) {
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }

    private attach() {
        this.mSchedule.root.addEventListener('mousedown', this.onMouseDown);
        this.mSchedule.root.addEventListener('mousemove', this.onMouseMove);
        this.mSchedule.root.addEventListener('mouseup', this.onMouseUp);
        this.mFloat.root.addEventListener('keydown', this.onKeyDown);
        this.mFloat.root.addEventListener('keyup', this.onKeyUp);
    }

    private setCellEdit(on: boolean): void {
        this.cellEdit = on;
        if (!on) {
            this.mFloat.root.classList.add("widget-hide-caret");
        }
        else {
            this.mFloat.root.classList.remove("widget-hide-caret");
        }

    }

    private onKeyDownSelection(e: KeyboardEvent): void {
        let advanceBy = 1;
        if (e.ctrlKey) {
            advanceBy = 5;
        }

        switch (e.code) {
            case 'ArrowDown':
                this.mSchedule.selection_grow(advanceBy, 0);
                e.preventDefault();
                break;

            case 'ArrowLeft':
                this.mSchedule.selection_grow(0, -advanceBy);
                e.preventDefault();
                break;

            case 'ArrowRight':
                this.mSchedule.selection_grow(0, advanceBy);
                e.preventDefault();
                break;

            case 'ArrowUp':
                this.mSchedule.selection_grow(-advanceBy, 0);
                e.preventDefault();
                break;
        }
    }

    private onKeyDownCellEdit(e: KeyboardEvent): void {
        if (e.code == "Escape") {
            this.setCellEdit(false);
            e.preventDefault();
        }
    }

    private onKeyDownNotCellEdit(e: KeyboardEvent): void {
        let cellID: ScheduleCellID = null;
        switch (e.code) {
            case "ArrowLeft":
                cellID = this.mSchedule.selection_advance(0, -1);
                break;
            case "Tab":
            case "ArrowRight":
                cellID = this.mSchedule.selection_advance(0, 1);
                break;
            case "ArrowUp":
                cellID = this.mSchedule.selection_advance(-1, 0);
                break;
            case "Enter":
            case "ArrowDown":
                cellID = this.mSchedule.selection_advance(1,  0);
                break;
                
        }
        if (cellID) {
            this.mFloat.show(this.mSchedule.getHtmlElement(cellID),
                this.mSchedule.getCellDetails(cellID).data.value.toString());
            this.setCellEdit(false);
            e.preventDefault();
        }
        
    } 

    private onKeyDown = (e: KeyboardEvent): void => {
       // if (e.defaultPrevented) return;
        
        if (e.shiftKey && this.cellEdit == false) {
            this.onKeyDownSelection(e);
        }
        else if (this.cellEdit) {
            this.onKeyDownCellEdit(e);
        }
        else {
            this.onKeyDownNotCellEdit(e);
        }
        
    }

    private onKeyUp = (e: Event): void => {
        
    }

    private onMouseDown = (e: MouseEvent): void => {
        if (e.target == this.mFloat.root) {
            this.setCellEdit(true);
        }
        else {
            let cell = this.mSchedule.getElementDetails(<HTMLElement>e.target);
            if (e.button == 0) {
                this.mSchedule.selection_click(cell.id, true)
                this.mSelecting = true;
                this.mFloat.show(<HTMLElement>e.target, cell.data.value.toString());
                this.setCellEdit(false);
            } else {
                this.mSelecting = false;
            }
        }
        e.preventDefault();
    }
    private onMouseMove = (e: MouseEvent): void => {
        if (e.target == this.mFloat.root) {

        }
        else {
            if (e.buttons == 1) {
                if (this.mSelecting) {
                    this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target), false)
                }
            } else {
                this.mSelecting = false;
            }
        }
        e.preventDefault();
    }

    private onMouseUp = (e: MouseEvent): void => {
       if (e.target == this.mFloat.root) {
            //this.setCellEdit(true);
        }
        else {
            this.mSchedule.selection_click(this.mSchedule.getElementID(<HTMLElement>e.target), false)
            this.mSelecting = false;
            this.setCellEdit(false);
        }
        e.preventDefault();
    }

    show() : void {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}