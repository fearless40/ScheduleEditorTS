import { MaxColumns, CellSimple } from "./Cell.js";
export class Wrapper {
    constructor(mDataTable) {
        this.mDataTable = mDataTable;
    }
    toGrid() {
        let ret = new Array();
        ret.length = this.mDataTable.maxCountRows();
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
            let that = this;
            nextGroup.forEach(function (value, index) {
                if (index == 0 && that.borderBetweenDivisions) {
                    last[last.length - 1].forEach((value) => { value.cssClasses.push("cell-bottom-border-divison"); });
                    value.forEach((value) => { value.cssClasses.push("cell-top-border-divison"); });
                }
                last.push(value);
            });
        }
        if (this.isHeader) {
            last.forEach((value) => {
                value.forEach((cell) => cell.isReadOnly = true);
            });
        }
        return last;
    }
}
//# sourceMappingURL=Layout.js.map