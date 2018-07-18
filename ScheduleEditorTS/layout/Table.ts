import * as Layout from "./Layout.js"
import {MetaTypes, MetaLayout, SearchForPseudoElements } from "./MetaData.js"
import {TableRange} from "./Helpers.js"
import { Cell2d } from "./Cell.js";


export class LayoutTable extends Layout.Vertical {
    private meta : Set<MetaLayout>;


    constructor(autoExpand: boolean = true) {
        super(false, autoExpand);
    }

    metaData_exists(type: MetaTypes): boolean {
        const values = this.meta.values();
        for (let v of values) {
            if (v.type == type) {
                return true;
            }
        }
        return false;
    }

    metaData_get(type: MetaTypes): MetaLayout[] {
        let meta_array = new Array<MetaLayout>();
        const values = this.meta.values();
        for (let v of values) {
            if (v.type == type) {
                meta_array.push(v);
            }
        }
        return meta_array;
    }

    toGrid(): Cell2d {
        let ret = super.toGrid();
        let pElements = SearchForPseudoElements(ret);
        return ret;
    }
   
}
