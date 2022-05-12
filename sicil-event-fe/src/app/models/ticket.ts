export interface Ticket {
    idSale: string;
    _id: string;
    name: string;
    surname: string;
    pr?: any[];
    type: Type,
    status: Status
}

export enum Type {
    GIFT = "GIFT",
    DANCE_FLOOR = "DANCE FLOOR",
    BACKSTAGE = "BACKSTAGE"
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
