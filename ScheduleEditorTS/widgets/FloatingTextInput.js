export class FloatingTextInput {
    constructor() {
        this.element = document.createElement("input");
        this.element.type = "text";
        this.element.classList.add("widget-input-text");
        this.parent = null;
    }
    get root() {
        return this.element;
    }
    show(parent, value) {
        this.hide();
        this.parent = parent;
        this.element.value = value;
        this.parent.appendChild(this.element);
        this.element.select();
        this.element.focus();
    }
    hide() {
        if (this.parent) {
            this.parent.removeChild(this.element);
            this.parent = null;
        }
    }
}
//# sourceMappingURL=FloatingTextInput.js.map