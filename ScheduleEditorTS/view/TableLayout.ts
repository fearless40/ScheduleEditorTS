import * as DV from "../view/DataTable.js"
import { Cell, Cell2d, MaxColumns  } from "./Grid.js"


export interface LayoutItem {
   toGrid(): Cell2d
}

export const enum LayoutPosition {
    Last = -1,
    First = 0,
    Specify = 255
}


export class Wrapper implements LayoutItem {
    toGrid(): Cell2d {
        let ret = new Array<Array<Cell>>();
        for (let i = 0; i < this.mDataTable.maxCountRows(); ++i) {
            let row = this.mDataTable.getRow(i);
            ret[i] = row.map<Cell>(function (value: DV.DataItem) : Cell {
                return new Cell(value);
            });
        }
        return ret;
    }

    constructor(private mDataTable: DV.DataTable) {
 
    }
    
}


function AddLayout(LayoutArray: LayoutItem[], item: LayoutItem, position: LayoutPosition, specific_position?: number) : number {
    switch (position) {
        case LayoutPosition.Last:
            LayoutArray.push(item);
            return LayoutArray.length - 1;
        case LayoutPosition.First:
            LayoutArray.unshift(item);
            return 0;
        case LayoutPosition.Specify:
            if (specific_position == undefined || specific_position > LayoutArray.length || specific_position < 0) {
                LayoutArray.push(item)
                return LayoutArray.length - 1;
            }
            else {
                LayoutArray.splice(specific_position, 0, item);
                return specific_position;
            }
    }
}


export class Horizontal implements LayoutItem{
    addDataTable(datatable: DV.DataTable, position : LayoutPosition = LayoutPosition.Last, specific_position? : number): number {
        return this.addLayout(new Wrapper(datatable), position, specific_position);
    }

    addLayout(layoutitem: LayoutItem, position: LayoutPosition = LayoutPosition.Last, specific_position?: number) : number {
        return AddLayout(this.mLayouts, layoutitem, position, specific_position);
    }

    adjustRowspan(adjust: Cell2d, comparelength: number): void {
        let rowIndex = adjust.length - 1;
        let rowSpan = comparelength - adjust.length;
        for (let colIndex = 0; colIndex < adjust[rowIndex].length; ++colIndex) {
            adjust[rowIndex][colIndex].rowspan = rowSpan;
        }
    }

    addEmptyRows(adjust: Cell2d, comparelength: number): void {
        let emptycol = new Array<Cell>();
        emptycol.length = adjust[0].length;
        // Create blank array of values
        for (let colIndex = 0; colIndex < adjust[0].length; ++colIndex) {
            emptycol[colIndex] = Cell.EmptyCell;
        }

        //Set the blank array to each row that is not equal
        for (let rowIndex = 0; rowIndex < comparelength - adjust.length; ++rowIndex) {
            adjust.push(emptycol)
        }
    }

    toGrid(): Cell2d {
        let last = this.mLayouts[0].toGrid();
        for (let i = 1; i < this.mLayouts.length; ++i) {
            let nextGroup = this.mLayouts[i].toGrid();
            if (this.autoExpand && last.length < nextGroup.length) {
                // Need to adjust the rowspan of the last item to meet the values
                this.adjustRowspan(last, nextGroup.length);
            }
            this.addEmptyRows(last, nextGroup.length) //Always need to pad the rows with empty cells to allow the following to work. 
            last.forEach(function (value: Cell[], index: number): void {
                last[index].concat(nextGroup[index]);
            });
        }
        return last;
    }

    private mLayouts : Array<LayoutItem> = []

    //public isHeaderLike = false; //Set to true tends to make the item always visible
    //public autoExpand = true; //Set to true to change the colspan rather than generate empty cells
    constructor(public isHeader: boolean = false, public autoExpand: boolean = true) {

    }

}

export class Vertical implements LayoutItem{
    addDataTable(datatable: DV.DataTable, position: LayoutPosition = LayoutPosition.Last, specific_position?: number): number {
        return this.addLayout(new Wrapper(datatable), position, specific_position);
    }

    addLayout(layoutitem : LayoutItem, position: LayoutPosition = LayoutPosition.Last, specific_position?: number) : number {
        return AddLayout(this.mLayouts, layoutitem, position, specific_position);
    }

    addEmptyCols(adjust: Cell[], nbrToAdd: number): void {
        for (let i = 0; i < nbrToAdd; ++i) {
            adjust.push(Cell.EmptyCell);
        }
    }


    toGrid(): Cell2d {
        let last = this.mLayouts[0].toGrid();
        for (let vIndex = 1; vIndex < this.mLayouts.length; ++vIndex) {
            let nextGroup = this.mLayouts[vIndex].toGrid();
            let maxCol = MaxColumns(nextGroup);
            for (let row = 0; row < last.length; ++row) {
                let lRow = last[row];
                if (lRow.length < maxCol) {
                    if (this.autoExpand) {
                        lRow[lRow.length - 1].colspan = maxCol - lRow.length;
                    }
                    this.addEmptyCols(lRow, maxCol - lRow.length);
                }
            }

            // Now Add all the rows from nextGroup to last
            nextGroup.forEach(function (value: Cell[]) {
                last.push(value);
            })
        }
        return last;
    }

    private mLayouts: LayoutItem[] = [];

    //public isHeaderLike = false; //Set to true tends to make the item always visible
    //public autoExpand = true; //Set to true to change the colspan rather than generate empty cells
    constructor(public isHeader: boolean = false, public autoExpand: boolean = true) {

    }
}

export class LayoutTable extends Vertical {
        
    constructor(autoExpand: boolean = true) {
        super(false, autoExpand);
    }
}
