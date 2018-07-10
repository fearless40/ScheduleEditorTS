

export class FloatingTextInput {
    private element : HTMLInputElement
    private parent: HTMLElement;
    private textEditMode: boolean;

    constructor() {
        this.element = document.createElement("input");
        this.element.type = "text"
        this.element.classList.add("widget-input-text")
        this.parent = null;
    }

    get root(): HTMLElement {
        return this.element;
    }

    show(parent: HTMLElement, value : string): void {
        this.hide();
        this.parent = parent;
        this.element.value = value;
        this.parent.appendChild(this.element);
        this.element.select();
        this.element.focus();
    }

    hide(): void {
        if (this.parent) {
            this.parent.removeChild(this.element);
            this.parent = null;
        }
    }


    //setTimeout(() => this.element.selectionStart = this.element.selectionEnd = this.element.value.length + 2, 0);
}