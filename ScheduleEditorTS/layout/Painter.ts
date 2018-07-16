import {LayoutItem} from "./Layout.js"

interface Painter {
    get_css(row: number, col: number): string;

}