import {LayoutItem} from "../../layout/Layout.js"
import { DataView } from "../../data/Data.js";

export interface PaintInformation {
    value: string
    row: number
    col: number
    owner: DataView
    id: number
}

export interface PainterCallback {
    (element: HTMLElement, data: PaintInformation): void;
}

export interface Painter {
    paint: PainterCallback;
}

