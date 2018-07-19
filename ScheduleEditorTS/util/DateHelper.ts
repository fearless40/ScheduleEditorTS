﻿
export class MonthHelper {

    constructor(public month: number, public year: number) {

    }

    get month_normal(): number {
        return this.month + 1;
    }

    get date_start(): Date {
        return new Date(this.year, this.month, 1);
    }

    get date_end(): Date {
        return new Date(this.year, this.month + 1, 0);
    }

    get days_count(): number {
        return (this.date_end.getDate() - this.date_start.getDate()) + 1
    }

    day_get(day: number): Date {
        return new Date(this.year, this.month, day);
    }

    day_name_short(day: number): string {
        return this.day_get(day).toLocaleDateString("en", { weekday: "narrow" });
    }

    day_name_long(day: number): string {
        return this.day_get(day).toLocaleDateString("en", { weekday: "long" });
    }
}

export function IsWeekend(d: Date): boolean {
    return (this.day_get(d).toLocaleDateString("en", { weekday: "narrow" }) == "S" )
}