


export type DataValue = string | number

export interface OnChange {
    (id: number[], valueNew: DataValue[], valueOld: DataValue[]): boolean
}

export interface OnChangeToken {
    readonly token : any;
}

export interface DataItem {
    value: DataValue;
    readonly isReadOnly: boolean;
    readonly id: number
}

export class EmptyDataItem implements DataItem {
    readonly value: string = "";
    readonly isReadOnly: boolean = true;
    readonly id: number = 0

    public static readonly EmptyItem = new EmptyDataItem();
}

export interface DataView {
    getById(dataID: number): DataItem
    getOnChange(): OnChange
    setOnChange(cb: OnChange): OnChangeToken
}

export interface DataTable extends DataView{
    maxCountRows(): number
    maxCountCols(): number
    getRow(rowIndex: number): Array<DataItem>
    getByRowCol(row : number, col : number ) : DataItem
}
   

