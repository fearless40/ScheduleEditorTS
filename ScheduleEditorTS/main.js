import * as Lt from "./view/TableLayout.js";
import { MonthLabel, MonthHeader } from "./data/MonthDataSink.js";
import { ScheduleSlotData } from "./data/ScheduleData.js";
import { GetSingleDataItem, LimitColumns } from "./data/DataSelectors.js";
import { TableEditor } from "./controllers/tableeditor.js";
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
    //let render = new ScheduleWidget(el);
    //render.render(tLayout);
    let tableeditor = new TableEditor(el, tLayout);
    tableeditor.show();
}
window.onload = () => {
    main();
};
//# sourceMappingURL=main.js.map