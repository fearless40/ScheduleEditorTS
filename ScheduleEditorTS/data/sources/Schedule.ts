import { EventDefinition, EventGroup } from "./EventGroup";
import { ScheduleOwner } from "./ScheduleOwner";

export interface ScheduleEvent extends Properties{
    time_start: Date
    duration: number // in minutes
    value: EventDefinition
}


export interface ScheduleEvents {
    readonly owner: Schedule
    time_start?: Date
    time_end?: Date
    eventgroup : EventGroup
    data: Array<ScheduleEvent>
}

export interface WriteEventOutput {
    error: boolean
    reason: string
}

export interface Schedule {
    readonly id: string 
    loadEventGroup(): Promise<EventGroup>
    loadOwner(): Promise<ScheduleOwner>
    loadEvents(start: Date, end: Date): Promise<ScheduleEvents>
    writeEvents(events: ScheduleEvents, overWrite : boolean): Promise<WriteEventOutput>
}

