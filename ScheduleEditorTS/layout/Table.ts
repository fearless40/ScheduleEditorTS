import * as Layout from "./Layout.js"
import {PseudoTypes, PseudoLayout, SearchForPseudoElements } from "./PseudoClass.js"
import {TableRange} from "./Helpers.js"
import { Cell2d } from "./Cell.js";


export class LayoutTable extends Layout.Vertical {
    private pElements : Set<PseudoLayout>;


    constructor(autoExpand: boolean = true) {
        super(false, autoExpand);
    }

    pseudoElement_has(): boolean {
        return this.pElements.size > 0;
    }

    pseudoElement_get(type: PseudoTypes): TableRange {
        const values = this.pElements.values();
        for (let v of values) {
            if (v.type == type) {
                return v.range;
            }
        }
        return new TableRange(-1, -1, -1, -1);
    }

    toGrid(): Cell2d {
        let ret = super.toGrid();
        let pElements = SearchForPseudoElements(ret);
        return ret;
    }
   
}
