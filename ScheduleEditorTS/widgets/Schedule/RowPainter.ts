import { MetaLayout, MetaTypes, CellMarked, Markers } from "../../layout/MetaData.js";
import { Painter, PaintInformation, PainterCallback } from "./Painter.js";
import { LayoutItem, Wrapper, WrapperHelper } from "../../layout/Layout.js";
import { DataTable } from "../../data/Data.js";
import { Cell2d } from "../../layout/Cell.js";
import { TableRange } from "../../layout/Helpers.js";

const enum RowPainterSelection {
    AllRows,
    FirstRow,
    LastRow,
    EvenRows,
    OddRows
}

export class RowPainter implements MetaLayout, Painter {

    private item: LayoutItem;

    constructor(item: DataTable | LayoutItem, private cb: PainterCallback, private position : RowPainterSelection) {
        this.item = WrapperHelper(item);
    }

    range: TableRange = new TableRange(-1, -1, -1, -1);

   
    get type(): MetaTypes {
        return MetaTypes.Rows;
    }

    paint(element: HTMLElement, info: PaintInformation) {
        switch (this.position) {
            case RowPainterSelection.EvenRows:
                if (info.row % 2 == 0) { this.cb(element, info); }
                return;
            case RowPainterSelection.OddRows:
                if (info.row % 2 != 0) { this.cb(element, info); }
                return;
            default:
                this.cb(element, info);
        }
    }

    toGrid(): Cell2d {
        //return super.toGrid();
        const values = this.item.toGrid();
        const lastRow = values.length - 1;
        const lastCol = values[0].length - 1;

        switch (this.position) {
            case RowPainterSelection.EvenRows:
            case RowPainterSelection.OddRows:
            case RowPainterSelection.AllRows:
                values[0][0] = new CellMarked(values[0][0], Markers.Start, this);
                values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], Markers.End, this);
                break;
            case RowPainterSelection.FirstRow:
                values[0][0] = new CellMarked(values[0][0], Markers.Start, this);
                values[0][lastCol] = new CellMarked(values[0][lastCol], Markers.End, this);
                break;
            case RowPainterSelection.LastRow:
                values[lastRow][0] = new CellMarked(values[lastRow][0], Markers.Start, this);
                values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], Markers.End, this);
                break;
        }
        return values;
    }
}