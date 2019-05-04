
export interface ScheduleDB {
    open(): void
    getUsers(): void
    getEventGroups(): void
    getSchedules(start?: Date, end?: Date): void

}