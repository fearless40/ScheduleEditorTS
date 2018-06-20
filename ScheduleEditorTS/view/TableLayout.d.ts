import * as DV from "../data/Data.js";
import { Cell, Cell2d } from "./Cell.js";
export interface LayoutItem {
    toGrid(): Cell2d;
}
export declare const enum LayoutPosition {
    Last = -1,
    First = 0,
    Specify = 255,
}
export declare class Wrapper implements LayoutItem {
    private mDataTable;
    toGrid(): Cell2d;
    constructor(mDataTable: DV.DataTable);
}
export declare class Horizontal implements LayoutItem {
    isHeader: boolean;
    autoExpand: boolean;
    addDataTable(datatable: DV.DataTable, position?: LayoutPosition, specific_position?: number): number;
    addLayout(layoutitem: LayoutItem, position?: LayoutPosition, specific_position?: number): number;
    adjustRowspan(adjust: Cell2d, comparelength: number): void;
    addEmptyRows(adjust: Cell2d, comparelength: number): void;
    toGrid(): Cell2d;
    private mLayouts;
    constructor(isHeader?: boolean, autoExpand?: boolean);
    borderBetweenDivisions: boolean;
}
export declare class Vertical implements LayoutItem {
    isHeader: boolean;
    autoExpand: boolean;
    addDataTable(datatable: DV.DataTable, position?: LayoutPosition, specific_position?: number): number;
    addLayout(layoutitem: LayoutItem, position?: LayoutPosition, specific_position?: number): number;
    addEmptyCols(adjust: Cell[], nbrToAdd: number): void;
    toGrid(): Cell2d;
    private mLayouts;
    borderBetweenDivisions: boolean;
    constructor(isHeader?: boolean, autoExpand?: boolean);
}
export declare class LayoutTable extends Vertical {
    constructor(autoExpand?: boolean);
}
