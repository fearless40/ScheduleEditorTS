import * as Lt from "./view/TableLayout.js";
import { MonthLabel, MonthHeader } from "./data/MonthDataSink.js";
import { TableRender } from "./renders/TableRender.js";


function main() : void {
    let el = document.getElementById("MainContent");
    let tLayout = new Lt.LayoutTable(true);
    let hLayout = new Lt.Horizontal(true, true);
    hLayout.addDataTable(new MonthLabel());
    hLayout.addDataTable(new MonthHeader(0, 2017, false));
    tLayout.addLayout(hLayout);
    tLayout.addLayout(hLayout);

    let render = new TableRender(el, tLayout);

    render.render();

}

window.onload = () => {
    main();
}