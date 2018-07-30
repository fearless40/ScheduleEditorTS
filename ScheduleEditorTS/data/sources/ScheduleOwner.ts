
export interface ScheduleOwner extends Properties {
    readonly id: string
    readonly display: string
    readonly fullname: string
    properties? : Map<string, Property>
}