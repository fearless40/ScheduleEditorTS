import * as Layout from "./Layout.js";
import { SearchForPseudoElements } from "./MetaData.js";
export class LayoutTable extends Layout.Vertical {
    constructor(autoExpand = true) {
        super(false, autoExpand);
    }
    metaData_exists(type) {
        const values = this.meta.values();
        for (let v of values) {
            if (v.type == type) {
                return true;
            }
        }
        return false;
    }
    metaData_get(type) {
        let meta_array = new Array();
        const values = this.meta.values();
        for (let v of values) {
            if (v.type == type) {
                meta_array.push(v);
            }
        }
        return meta_array;
    }
    toGrid() {
        let ret = super.toGrid();
        this.meta = SearchForPseudoElements(ret);
        return ret;
    }
}
//# sourceMappingURL=Table.js.map