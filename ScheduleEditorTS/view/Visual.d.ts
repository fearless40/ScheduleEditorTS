interface Visual {
    asClassName(): string;
}
declare class VisualClass implements Visual {
    private mClass;
    asClassName(): string;
    constructor(mClass: string);
}
