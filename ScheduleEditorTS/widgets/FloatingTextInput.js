export class FloatingTextInput {
    constructor() {
        this.onInput = (e) => {
            if (e.data && !this.codeSetValue) {
                this.dirty = true;
            }
        };
        this.element = document.createElement("input");
        this.element.type = "text";
        this.element.classList.add("widget-input-text");
        this.element.addEventListener('input', this.onInput);
    }
    get root() {
        return this.element;
    }
    show(parent, value) {
        this.codeSetValue = true;
        this.hide();
        this.element.value = value;
        parent.appendChild(this.element);
        this.element.select();
        this.element.focus();
        this.dirty = false;
        this.codeSetValue = false;
    }
    hide() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    dirty_reset() {
        this.dirty = false;
    }
    get isDirty() {
        return this.dirty;
    }
    get value() {
        return this.element.value;
    }
}
//# sourceMappingURL=FloatingTextInput.js.map