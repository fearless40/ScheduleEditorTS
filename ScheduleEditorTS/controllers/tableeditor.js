import { ScheduleWidget } from "../widgets/ScheduleWidget.js";
import { FloatingTextInput } from "../widgets/FloatingTextInput.js";
export class TableEditor {
    constructor(parentNode, layout) {
        this.onKeyDown = (e) => {
            if (e.shiftKey) {
                if (e.defaultPrevented)
                    return;
                this.onKeyDownSelection(e);
                return;
            }
        };
        this.onKeyUp = (e) => {
        };
        this.onDragStart = (e) => {
            if (e.button == 0) {
                this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), true);
                this.mSelecting = true;
                let cell = this.mSchedule.getElementDetails(e.target);
                this.mFloat.show(e.target, cell.data.value.toString());
            }
            else {
                this.mSelecting = false;
            }
            e.preventDefault();
        };
        this.onDrag = (e) => {
            if (e.buttons == 1) {
                if (this.mSelecting) {
                    this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
                }
            }
            else {
                this.mSelecting = false;
            }
            e.preventDefault();
        };
        this.onDragEnd = (e) => {
            this.mSchedule.selection_click(this.mSchedule.getElementID(e.target), false);
            this.mSelecting = false;
            e.preventDefault();
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
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }
    onKeyDownSelection(e) {
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
    onClick(e) {
        let cell = this.mSchedule.getElementDetails(e.target);
        this.mSchedule.selection_click(cell.id, true);
        this.mFloat.show(e.target, cell.data.value.toString());
    }
    show() {
        this.mSchedule.render(this.mLayout);
        this.attach();
    }
}
//# sourceMappingURL=TableEditor.js.map