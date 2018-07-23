import { ScheduleWidget } from "../widgets/Schedule/ScheduleWidget.js";
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";
export class TableEditor {
    constructor(parentNode, layout) {
        this.onKeyDown = (e) => {
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
        };
        this.onKeyUp = (e) => {
        };
        this.onMouseDown = (e) => {
            if (e.target == this.mFloat.root) {
                this.setCellEdit(true);
            }
            else {
                let cell = this.mSchedule.getElementDetails(e.target);
                if (e.button == 0 && cell.id.isValid) {
                    this.cellEditor_store();
                    this.cellEditor_move(e.target, cell.data.value.toString());
                    this.mSchedule.selection_click(cell.id, true);
                    this.mSelecting = true;
                }
                else {
                    this.mSelecting = false;
                }
            }
            e.preventDefault();
        };
        this.onMouseMove = (e) => {
            if (e.target == this.mFloat.root) {
            }
            else {
                if (e.buttons == 1) {
                    if (this.mSelecting) {
                        this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
                    }
                }
                else {
                    this.mSelecting = false;
                }
            }
            e.preventDefault();
        };
        this.onMouseUp = (e) => {
            if (e.target == this.mFloat.root) {
                //this.setCellEdit(true);
            }
            else {
                this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
                this.mSelecting = false;
                this.setCellEdit(false);
            }
            e.preventDefault();
        };
        this.mLayout = layout;
        this.mSchedule = new ScheduleWidget(parentNode);
        this.mFloat = new FloatingTextInput();
    }
    attach() {
        this.mSchedule.root.addEventListener('mousedown', this.onMouseDown);
        this.mSchedule.root.addEventListener('mousemove', this.onMouseMove);
        this.mSchedule.root.addEventListener('mouseup', this.onMouseUp);
        this.mFloat.root.addEventListener('keydown', this.onKeyDown);
        this.mFloat.root.addEventListener('keyup', this.onKeyUp);
    }
    setCellEdit(on) {
        this.cellEdit = on;
        if (!on) {
            this.mFloat.root.classList.add("widget-hide-caret");
        }
        else {
            this.mFloat.root.classList.remove("widget-hide-caret");
        }
    }
    cellEditor_store() {
        if (this.mFloat.isDirty) {
            // Need to retieve the id of the cell that it is editing
            const cid = this.mSchedule.selection_firstcell;
            const cell = this.mSchedule.cell_details(cid);
            this.process_change(cell, this.mFloat.value);
            this.mFloat.dirty_reset();
        }
    }
    cellEditor_move(element, value) {
        this.setCellEdit(false);
        // Now set the editor to the new cell
        if (element instanceof HTMLElement) {
            this.mFloat.show(element, value);
        }
        else {
            this.mFloat.show(this.mSchedule.getHtmlElement(element), value);
        }
    }
    process_change(cell, newValue) {
        if (cell.data.value.toString() != newValue) {
            cell.data.owner.modify([cell.data.id], [newValue]);
        }
    }
    process_changes(cells, newValues) {
        let owner = cells[0].data.owner;
        let batchId = new Array();
        let batchval = new Array();
        for (let i = 0; i < cells.length; ++i) {
            if (owner != cells[i].data.owner) {
                owner.modify(batchId, batchval);
                owner = cells[i].data.owner;
                batchId = new Array();
                batchval = new Array();
            }
            else {
                batchId.push(cells[i].data.id);
                batchval.push(newValues[i]);
            }
        }
        owner.modify(batchId, batchval);
    }
    selection_advance(row, col) {
        this.cellEditor_store();
        const newId = this.mSchedule.selection_advance(row, col);
        if (newId.isValid) {
            this.cellEditor_move(newId, this.mSchedule.cell_value(newId));
        }
    }
    selection_delete() {
        const ids = this.mSchedule.selection_get().asArray();
        const values = new Array(ids.length);
        values.fill("");
        this.process_changes(ids, values);
        this.cellEditor_move(this.mSchedule.selection_firstcell, "");
    }
    onKeyDownSelection(e) {
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
    onKeyDownCellEdit(e) {
        if (e.code == "Escape") {
            this.setCellEdit(false);
            e.preventDefault();
        }
    }
    onKeyDownNotCellEdit(e) {
        let cellID = null;
        switch (e.code) {
            case "ArrowLeft":
                this.selection_advance(0, -1);
                e.preventDefault();
                break;
            case "Tab":
            case "ArrowRight":
                this.selection_advance(0, 1);
                e.preventDefault();
                break;
            case "ArrowUp":
                this.selection_advance(-1, 0);
                e.preventDefault();
                break;
            case "Enter":
            case "ArrowDown":
                this.selection_advance(1, 0);
                e.preventDefault();
                break;
            case "Delete":
                this.selection_delete();
                e.preventDefault();
        }
    }
    show() {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}
//# sourceMappingURL=TableEditor.js.map