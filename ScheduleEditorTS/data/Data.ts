
export type DataValue = string | number

export interface onChangeResults {
    isOk: boolean
    errors?: {
        ids: number[]
        reason: string[]
        value: DataValue[]
    }
}

export interface OnChange {
    (ids: number[], values: DataValue[]): void
}

/*export interface OnChangeToken {
    readonly token : any;
}*/

export interface DataItem {
    readonly value: DataValue;
    readonly id: number
    readonly owner: DataView;
}

export interface DataEvents {
    addListener(cb: OnChange): void
    removeListener(cb: OnChange): void
}

export interface DataView {
    getById(dataID: number): DataItem
    modify?(ids: number[], values: DataValue[]): onChangeResults
    events?: DataEvents;
}

export interface DataTable extends DataView{
   maxCountRows(): number
   maxCountCols(): number
   getRow(rowIndex: number): Array<DataItem>
   // getByRowCol(row : number, col : number ) : DataItem
}
   

