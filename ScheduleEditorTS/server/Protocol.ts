
export const enum PayloadType {
    EnumerateDataType
}

export class Payload {
    payload_type: PayloadType
}


export const enum EnumerateDataType {
    TimeSlots,
    Schedules
}

export class EnumerateData extends Payload{
    data_type: EnumerateDataType
}

export class TimeSlotValues extends Payload {
    TimeSlots
}