import {LayoutItem} from "../../layout/Layout.js"
import { DataTable } from "../../data/Data.js";

export interface PaintInformation {
    value: string
    row: number
    col: number
    owner: DataTable
    id: number
}

export interface PainterCallback {
    (element: HTMLElement, data: PaintInformation): void;
}

export interface Painter {
    paint: PainterCallBack;
}

