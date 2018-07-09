

export class FloatingTextInput {
    private element : HTMLInputElement
    private parent: HTMLElement;
    private textEditMode: boolean;

    constructor() {
        this.element = document.createElement("input");
        this.element.type = "text"
        this.element.classList.add("widget-input-text")
        this.element.addEventListener('click', this.enterTextEditMode);
        this.element.addEventListener('keydown', this.onKeyDown);
    }

    show(parent: HTMLElement, value : string): void {
        this.hide();
        this.parent = parent;
        this.element.value = value;
        //this.mElement.selectionStart = 0;
        //this.mElement.selectionEnd = value.length;
        this.parent.appendChild(this.element);
        this.element.select();
    }

    hide(): void {
        if (this.parent) {
            this.parent.removeChild(this.element);
            this.parent = null;
        }
        this.textEditMode = false;
    }

    private enterTextEditMode = (e: MouseEvent): void => {
        this.textEditMode = true;
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        if (this.textEditMode) {
            if (e.key == "Escape") {
                this.textEditMode = false;
            }
            else {
                e.stopPropagation();
            }
        }
        else {
            //this.element.setSelectionRange(this.element.value.length + 10, this.element.value.length + 10);
            setTimeout(() => this.element.selectionStart = this.element.selectionEnd = this.element.value.length + 2, 0);
        }
    }
}