export class MonthHelper {
    constructor(month, year) {
        this.year = year;
        this.month = month - 1;
    }
    get month_normal() {
        return this.month + 1;
    }
    get date_start() {
        return new Date(this.year, this.month, 1);
    }
    get date_end() {
        return new Date(this.year, this.month + 1, 0);
    }
    get days_count() {
        return (this.date_end.getDate() - this.date_start.getDate()) + 1;
    }
    day_get(day) {
        return new Date(this.year, this.month, day);
    }
    day_name_short(day) {
        return this.day_get(day).toLocaleDateString("en", { weekday: "narrow" });
    }
    day_name_long(day) {
        return this.day_get(day).toLocaleDateString("en", { weekday: "long" });
    }
}
export function IsWeekend(d) {
    return (this.day_get(d).toLocaleDateString("en", { weekday: "narrow" }) == "S");
}
//# sourceMappingURL=DateHelper.js.map