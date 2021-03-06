export interface Ticket {
    idSale: string;
    _id: string;
    name: string;
    surname: string;
    email: string;
    pr?: any[];
    type: Type,
    status: Status
}

export enum Type {
    GIFT = "GIFT",
    DANCE_FLOOR = "DANCE_FLOOR",
    PRIVE = "PRIVE"
}

export enum Status {
    PAID = "PAID",
    NOTPAID = "NOTPAID",
}

export interface PayloadTicket {
    name: string;
    surname: string;
    email: string;
    status: Status;
    typeTicket: Type;
}

export const THESHOLD_GIFT = 26;