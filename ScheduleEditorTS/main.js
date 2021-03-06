import { LayoutTable } from "./layout/Table.js";
import { MonthLabel, MonthDaysLabels } from "./data/MonthDataSink.js";
import { ScheduleSlotData } from "./data/ScheduleData.js";
import { GetSingleDataItem, LimitColumns } from "./data/DataSelectors.js";
import { TableEditor } from "./controllers/tableeditor.js";
import * as Lt from "./layout/Layout.js";
import * as Meta from "./layout/MetaData.js";
import { ColumnPainter } from "./widgets/Schedule/ColumnPainter.js";
function main() {
    let el = document.getElementById("MainContent");
    let table_layout = new LayoutTable(true);
    let schedule_data = new ScheduleSlotData();
    let schName = new GetSingleDataItem(schedule_data, -1 /* ScheduleOwnerName */);
    let slots = new LimitColumns(schedule_data, 0);
    let schView = new LimitColumns(schedule_data, 2, schedule_data.maxCountCols() - 1);
    let data_row_header = new Lt.Horizontal(true, true);
    data_row_header.addDataTable(schName);
    data_row_header.addDataTable(slots);
    let row_header = new Meta.MetaItem(data_row_header, 6 /* RowHeader */);
    let data_layout = new Lt.Horizontal(false, true);
    data_layout.addLayout(row_header);
    data_layout.addDataTable(schView);
    data_layout.borderBetweenDivisions = true;
    let header_layout = new Lt.Horizontal(true, true);
    let meta_header = new Meta.MetaItem(header_layout, 0 /* Header */);
    header_layout.addLayout(new ColumnPainter(new MonthLabel(5), (Element, info) => Element.style.width = "7em"));
    let month_days_vert = new Lt.Vertical(true, true);
    month_days_vert.borderBetweenDivisions = false;
    header_layout.addLayout(month_days_vert);
    month_days_vert.addLayout(new ColumnPainter(new MonthDaysLabels(5, 2018, 1 /* ShortText */), (element, info) => {
        if (info.value == "S") {
            element.classList.add("schedule-weekend-fmt");
        }
    }));
    month_days_vert.addLayout(new ColumnPainter(new MonthDaysLabels(5, 2018, 0 /* Number */), (element, info) => {
        if (info.value == "3") {
            element.classList.add("schedule-holiday-fmt");
        }
    }));
    table_layout.addLayout(meta_header);
    table_layout.addLayout(data_layout);
    header_layout.borderBetweenDivisions = true;
    table_layout.borderBetweenDivisions = true;
    let tableeditor = new TableEditor(el, table_layout);
    tableeditor.show();
}
window.onload = () => {
    main();
};
//# sourceMappingURL=main.js.map