import { EventDefinition, EventGroup } from "./EventGroup";
import { ScheduleOwner } from "./ScheduleOwner";
import { TimeSlots } from "./TimeSlot";
import { DataTable, DataItem, DataValue } from "../Data";



class ScheduleDataSource {
    owner_user: ScheduleOwner
    event_group: EventGroup
    time_slots: TimeSlots
}

export class ScheduleDefinition {
    id: number
    name: string
    author: UserID

    created_date: Date
    version: string
    data_source: Array<ScheduleDataSource>
    data_layout: any
}

export class Schedule {
    id: number
    date_start: Date
    date_end: Date
    definition: ScheduleDefinition
    versions: ScheduleVersions
    data: ScheduleStream
    snapshots: Map<ScheduleDataSource, ScheduleDataSnapShot>

    getNbrDays(): number {
        return 10;
    }
}

export class ScheduleVersions {
    id: number
    token: ScheduleStreamToken
    exported: boolean
    date_exported: Date
    export_format: string
    exported_by: UserID
    notes: string
}

class CellData {
    snapshotid: number
    value: string
}

interface ScheduleStreamEntry {
    data: Array<CellData>
    data_source: ScheduleDataSource
    user: UserID
}

export class ScheduleStream {
    schedule: Schedule
    data: Array<ScheduleStreamEntry>

    buildSnapShots(version: ScheduleVersions): Array<ScheduleDataSnapShot> {
        return [];
    }

    getSchedule(): Schedule {
        return this.schedule;
    }
}


export class ScheduleDataSnapShot implements DataTable{
    makeId(row: number, col: number): number {
        if (row < 0 || row > this.maxCountRows()) {
            throw new Error("Invalid Row data");
        }
        if (col < 0 || col > this.maxCountCols()) {
            throw new Error("Invlid Col size");
        }

        return (row * this.maxCountRows()) + col;
    }
    maxCountRows(): number {
        return this.data_meta.time_slots.maxCountRows();
    }
    maxCountCols(): number {
        return this.stream.getSchedule().getNbrDays();
    }
    getRow(rowIndex: number): DataItem[] {
        throw new Error("Method not implemented.");
    }
    getById(dataID: number): DataItem {
        throw new Error("Method not implemented.");
    }
    modify?(ids: number[], values: DataValue[]): import("../Data").onChangeResults {
        throw new Error("Method not implemented.");
    }
    events?: import("../../util/EventSimple").EventSimple<import("../Data").EventOnChange>;


    data: Array<string>
    data_meta: ScheduleDataSource
    stream: ScheduleStream
}








