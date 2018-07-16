import {LayoutItem} from "./Layout.js"
import { LayoutTable } from "./Table.js"
import {DataItem} from "../data/Data.js"
import {Cell2d, Cell, CellSimple} from "./Cell.js"
import { TableRange } from "./Helpers.js";

export const enum PseudoTypes {
    Header,
    Body,
    Footer,
    Columns,
    Rows,
    Caption
}

const enum Markers {
    Start,
    End
}

export interface PseudoLayout extends LayoutItem {
    toGrid(): Cell2d;
    range: TableRange;
    type: PseudoTypes;
}

export function SearchForPseudoElements(values: Cell2d) : Set<PseudoLayout> {
    let ret = new Set<PseudoLayout>();
    for (let row = 0; row < values.length; ++row) {
        for (let col = 0; col < values[0].length; ++col) {
            let c = values[row][col];
            if (c instanceof CellMarked) {
                c.marks.forEach((value) => {
                    if (value.position == Markers.Start) {
                        value.owner.range.row_start = row;
                        value.owner.range.col_start = col;
                    }
                    else {
                        value.owner.range.row_end = row;
                        value.owner.range.col_end = col;
                        ret.add(value.owner);
                    }
                });
            }
        }
    }
    return ret;
}

interface MarkInstance {
    position: Markers,
    owner: PseudoLayout
}

class CellMarked implements Cell {
    public rowspan: number
    public colspan: number
    public data: DataItem
    public isReadOnly: boolean

    constructor(cell: CellSimple | CellMarked, markerPosition: Markers, markOwner: PseudoLayout) {
        this.rowspan = cell.rowspan;
        this.colspan = cell.colspan;
        this.data = cell.data;
        this.isReadOnly = cell.isReadOnly;
        this.cssClasses = cell.cssClasses;

        if (cell instanceof CellMarked) {
            this.marks.push({ position: markerPosition, owner: markOwner });
        }
    }

    isEmpty(): boolean {
        return (this.rowspan <= 0 || this.colspan <= 0);
    }

    public cssClasses: string[] = [];
    public marks: MarkInstance[] = [];
}



function pseudoMarkerHelper(item : LayoutItem, layout: PseudoLayout) : Cell2d{
    const values = item.toGrid();
    values[0][0] = new CellMarked(values[0][0], Markers.Start, layout);

    const lastRow = values.length - 1;
    const lastCol = values[0].length - 1;

    values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], Markers.End, layout);

    return values;
}

class HeaderFooterBody implements PseudoLayout {
    range: TableRange = new TableRange(-1, -1, -1, -1);

    constructor(private item: LayoutItem, readonly layoutType: PseudoTypes) {

    }

    get type() : PseudoTypes {
        return this.layoutType;
    }

    toGrid(): Cell2d {
        return pseudoMarkerHelper(this.item, this);
    }
}

class ColumnPainter implements PseudoLayout {

    constructor(private item: LayoutItem, public cssClass: string) {

    }

    range: TableRange = new TableRange(-1, -1, -1, -1);



    get type(): PseudoTypes {
        return PseudoTypes.Columns;
    }

    toGrid(): Cell2d {
        return pseudoMarkerHelper(this.item, this);
    }
}