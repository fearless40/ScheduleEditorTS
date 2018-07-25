import { CellMarked } from "../../layout/MetaData.js";
import { WrapperHelper } from "../../layout/Layout.js";
import { TableRange } from "../../layout/Helpers.js";
export class RowPainter {
    constructor(item, cb, position) {
        this.cb = cb;
        this.position = position;
        this.range = new TableRange(-1, -1, -1, -1);
        this.item = WrapperHelper(item);
    }
    get type() {
        return 4 /* Rows */;
    }
    paint(element, info) {
        switch (this.position) {
            case 3 /* EvenRows */:
                if (info.row % 2 == 0) {
                    this.cb(element, info);
                }
                return;
            case 4 /* OddRows */:
                if (info.row % 2 != 0) {
                    this.cb(element, info);
                }
                return;
            default:
                this.cb(element, info);
        }
    }
    toGrid() {
        //return super.toGrid();
        const values = this.item.toGrid();
        const lastRow = values.length - 1;
        const lastCol = values[0].length - 1;
        switch (this.position) {
            case 3 /* EvenRows */:
            case 4 /* OddRows */:
            case 0 /* AllRows */:
                values[0][0] = new CellMarked(values[0][0], 0 /* Start */, this);
                values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], 1 /* End */, this);
                break;
            case 1 /* FirstRow */:
                values[0][0] = new CellMarked(values[0][0], 0 /* Start */, this);
                values[0][lastCol] = new CellMarked(values[0][lastCol], 1 /* End */, this);
                break;
            case 2 /* LastRow */:
                values[lastRow][0] = new CellMarked(values[lastRow][0], 0 /* Start */, this);
                values[lastRow][lastCol] = new CellMarked(values[lastRow][lastCol], 1 /* End */, this);
                break;
        }
        return values;
    }
}
//# sourceMappingURL=RowPainter.js.map