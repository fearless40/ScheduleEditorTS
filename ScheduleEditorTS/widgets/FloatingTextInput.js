export class FloatingTextInput {
    constructor() {
        this.mElement = document.createElement("input");
        this.mElement.type = "text";
        this.mElement.classList.add("widget-input-text");
    }
    show(parent, value) {
        this.hide();
        this.mParent = parent;
        this.mElement.value = value;
        //this.mElement.selectionStart = 0;
        //this.mElement.selectionEnd = value.length;
        this.mParent.appendChild(this.mElement);
        this.mElement.select();
    }
    hide() {
        if (this.mParent) {
            this.mParent.removeChild(this.mElement);
            this.mParent = null;
        }
    }
}
//# sourceMappingURL=FloatingTextInput.js.map