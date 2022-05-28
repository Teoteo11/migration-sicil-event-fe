import { Ticket } from "./ticket";


export interface User {
    _id: string;
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
    numberTicketsSold: number;
    ticketSold: Ticket[];
    pr: Pr[];
    __v: number;
}

export interface Pr extends User {
    numberTicketsSold: number;
    ticketsSold: Ticket[];
}

export interface Admin extends User {
    numberTicketsSold: number;
    pr: Pr[];
}

export enum Role { 
    ADMIN = 'ADMIN',
    PR = 'PR',
    RECEPTIONIST = 'RECEPTIONIST'
}
