
export interface EventDefinition extends Properties{
    readonly id: string
    readonly owner: EventGroup;
    readonly display?: string
}

export interface EventGroupForEachCB {
    (value: EventDefinition, index : number) : void
}

export interface EventGroup {
    readonly id: string
//    has(id: string): boolean
    add(id: string, display?: string, props?: Properties): void;
    validate(id:string):boolean
    get(id: string): EventDefinition
    forEach(cb : EventGroupForEachCB) : void
}