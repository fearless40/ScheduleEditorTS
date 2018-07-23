import { MaxColumns, CellSimple } from "./Cell.js";
export class Wrapper {
    constructor(mDataTable) {
        this.mDataTable = mDataTable;
    }
    toGrid() {
        let ret = new Array(this.mDataTable.maxCountRows());
        for (let i = 0; i < this.mDataTable.maxCountRows(); ++i) {
            let row = this.mDataTable.getRow(i);
            ret[i] = row.map(function (value) {
                return new CellSimple(value);
            });
        }
        return ret;
    }
}
function AddLayout(LayoutArray, item, position, specific_position) {
    switch (position) {
        case -1 /* Last */:
            LayoutArray.push(item);
            return LayoutArray.length - 1;
        case 0 /* First */:
            LayoutArray.unshift(item);
            return 0;
        case 255 /* Specify */:
            if (specific_position == undefined || specific_position > LayoutArray.length || specific_position < 0) {
                LayoutArray.push(item);
                return LayoutArray.length - 1;
            }
            else {
                LayoutArray.splice(specific_position, 0, item);
                return specific_position;
            }
    }
}
export class Horizontal {
    //public isHeaderLike = false; //Set to true tends to make the item always visible
    //public autoExpand = true; //Set to true to change the colspan rather than generate empty cells
    constructor(isHeader = false, autoExpand = true) {
        this.isHeader = isHeader;
        this.autoExpand = autoExpand;
        this.mLayouts = [];
        this.borderBetweenDivisions = false;
    }
    addDataTable(datatable, position = -1 /* Last */, specific_position) {
        return this.addLayout(new Wrapper(datatable), position, specific_position);
    }
    addLayout(layoutitem, position = -1 /* Last */, specific_position) {
        return AddLayout(this.mLayouts, layoutitem, position, specific_position);
    }
    adjustRowspan(adjust, comparelength) {
        let rowIndex = adjust.length - 1;
        let rowSpan = (comparelength - adjust.length) + 1; // +1 as rowspan of 1 is normal, therefore need to increase by 1
        for (let colIndex = 0; colIndex < adjust[rowIndex].length; ++colIndex) {
            adjust[rowIndex][colIndex].rowspan = rowSpan;
        }
    }
    addEmptyRows(adjust, comparelength) {
        let emptycol = new Array();
        emptycol.length = adjust[0].length;
        // Create blank array of values
        for (let colIndex = 0; colIndex < adjust[0].length; ++colIndex) {
            emptycol[colIndex] = CellSimple.EmptyCell;
        }
        //Set the blank array to each row that is not equal
        for (let rowIndex = 0; rowIndex < comparelength - adjust.length; ++rowIndex) {
            adjust.push(emptycol);
        }
    }
    toGrid() {
        let last = this.mLayouts[0].toGrid();
        for (let i = 1; i < this.mLayouts.length; ++i) {
            let nextGroup = this.mLayouts[i].toGrid();
            if (this.autoExpand && last.length < nextGroup.length) {
                // Need to adjust the rowspan of the last item to meet the values
                this.adjustRowspan(last, nextGroup.length);
            }
            this.addEmptyRows(last, nextGroup.length); //Always need to pad the rows with empty cells to allow the following to work. 
            for (let r = 0; r < last.length; ++r) {
                if (this.borderBetweenDivisions) {
                    last[r][last[r].length - 1].cssClasses.push("cell-right-border-divison");
                    nextGroup[r][0].cssClasses.push("cell-left-border-divison");
                }
                last[r] = last[r].concat(nextGroup[r]);
            }
        }
        if (this.isHeader) {
            last.forEach((value) => {
                value.forEach((cell) => cell.isReadOnly = true);
            });
        }
        return last;
    }
}
export class Vertical {
    //public isHeaderLike = false; //Set to true tends to make the item always visible
    //public autoExpand = true; //Set to true to change the colspan rather than generate empty cells
    constructor(isHeader = false, autoExpand = true) {
        this.isHeader = isHeader;
        this.autoExpand = autoExpand;
        this.mLayouts = [];
        this.borderBetweenDivisions = false;
    }
    addDataTable(datatable, position = -1 /* Last */, specific_position) {
        return this.addLayout(new Wrapper(datatable), position, specific_position);
    }
    addLayout(layoutitem, position = -1 /* Last */, specific_position) {
        return AddLayout(this.mLayouts, layoutitem, position, specific_position);
    }
    addEmptyCols(adjust, nbrToAdd) {
        for (let i = 0; i < nbrToAdd; ++i) {
            adjust.push(CellSimple.EmptyCell);
        }
    }
    toGrid() {
        let grids = new Array();
        let max_col = 0;
        // Figure out the max col size
        this.mLayouts.forEach((layout) => {
            const cells = layout.toGrid();
            max_col = Math.max(max_col, MaxColumns(cells));
            grids.push(cells);
        });
        grids.forEach((cells) => {
            for (let row = 0; row < cells.length; ++row) {
                let tempRow = cells[row];
                if (tempRow.length < max_col) {
                    if (this.autoExpand) {
                        tempRow[tempRow.length - 1].colspan = max_col - tempRow.length;
                    }
                    this.addEmptyCols(tempRow, max_col - tempRow.length);
                }
            }
        });
        // Todo: Merge the values in grid into one array
        let ret = grids.reduce((acc, cur) => {
            if (this.borderBetweenDivisions) {
                acc[acc.length - 1].forEach((value) => value.cssClasses.push("cell-bottom-border-divison"));
                cur[0].forEach((value) => value.cssClasses.push("cell-top-border-divison"));
            }
            return acc.concat(cur);
        });
        if (this.isHeader) {
            ret.forEach((value) => {
                value.forEach((cell) => cell.isReadOnly = true);
            });
        }
        return ret;
    }
}
//# sourceMappingURL=Layout.js.map