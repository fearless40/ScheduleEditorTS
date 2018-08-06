
export interface ScheduleOwner extends Properties {
    readonly id: string
    display: string
    fullname: string
    properties? : Map<string, Property>
}