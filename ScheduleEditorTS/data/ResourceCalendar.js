class ResourceCalendar {
    constructor() {

    }

    get nbrRows() {
        return 5;
    }

    get nbrCols() {
        return 5;
    }

    getRow(index) {
        return [index * 2, 1, 2, 3, 4];
    }


}