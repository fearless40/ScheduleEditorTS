import * as Lt from "./view/TableLayout.js";
import { MonthLabel, MonthHeader } from "./data/MonthDataSink.js";
import { TableRender } from "./renders/TableRender.js";
import { ScheduleSlotData } from "./data/ScheduleData.js";
import { GetSingleDataItem, LimitColumns } from "./data/DataSelectors.js";
function main() {
    let el = document.getElementById("MainContent");
    let tLayout = new Lt.LayoutTable(true);
    let hLayout = new Lt.Horizontal(true, true);
    let sch = new ScheduleSlotData();
    let schName = new GetSingleDataItem(sch, -1 /* ScheduleOwnerName */);
    let slots = new LimitColumns(sch, 0);
    let schView = new LimitColumns(sch, 2, sch.maxCountCols() - 1);
    let sHGroup = new Lt.Horizontal(true, true);
    sHGroup.addDataTable(schName);
    sHGroup.addDataTable(slots);
    let sGroup = new Lt.Horizontal(false, true);
    sGroup.addLayout(sHGroup);
    sGroup.addDataTable(schView);
    sGroup.borderBetweenDivisions = true;
    hLayout.addDataTable(new MonthLabel());
    hLayout.addDataTable(new MonthHeader(5, 2018));
    tLayout.addLayout(hLayout);
    tLayout.addLayout(sGroup);
    hLayout.borderBetweenDivisions = true;
    tLayout.borderBetweenDivisions = true;
    let render = new TableRender(el, tLayout);
    render.render();
}
window.onload = () => {
    main();
};
//# sourceMappingURL=main.js.map