import { MetaItem } from "../../layout/MetaData.js";
import { Wrapper } from "../../layout/Layout.js";
export class ColumnPainter extends MetaItem {
    constructor(item, cb) {
        super(new Wrapper(item), 3 /* Columns */);
        this.cb = cb;
        this.data = item;
    }
    paint(element, info) {
        info.owner = this.data;
        this.cb(element, info);
    }
    toGrid() {
        return super.toGrid();
    }
}
//# sourceMappingURL=ColumnPainter.js.map