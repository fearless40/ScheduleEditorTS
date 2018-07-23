import { MetaItem, MetaTypes } from "../../layout/MetaData.js";
import { Painter, PaintInformation, PainterCallback } from "./Painter.js";
import { LayoutItem, Wrapper } from "../../layout/Layout.js";
import { DataTable } from "../../data/Data.js";
import { Cell2d } from "../../layout/Cell.js";



export class ColumnPainter extends MetaItem implements Painter {

    private data: DataTable;

    constructor(item: DataTable, private cb: PainterCallback) {
        super(new Wrapper(item), MetaTypes.Columns);
        this.data = item;
    } 

    paint(element: HTMLElement, info: PaintInformation) {
        info.owner = this.data;
        this.cb(element, info);
    }

    toGrid(): Cell2d {
        return super.toGrid();
    }
}