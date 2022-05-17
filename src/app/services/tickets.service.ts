import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { PayloadTicket, Ticket } from '../models/ticket';

export interface ReceptionistData {
    incomingNumber: number;
    tickets: Ticket[];
}

@Injectable({
    providedIn: 'root'
})

export class TicketsService {

    containerTickets: Ticket[] = [];

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    getTickets = async () =>
        await this.http.get<Ticket[]>(`${environment.url}/ticket/${this.cookieService.get('id')}/prtickets`).toPromise();

    getTicketsOfSpecificPR = async (idPr: string) =>{
        console.log('SONO PASSATO DA QUI');
        return await this.http.get<Ticket[]>(`${environment.url}/ticket/${idPr}/prtickets`).toPromise();}

    updateTicket = async (idTicket: string) =>
        await this.http.post<any>(`${environment.url}/ticket/${this.cookieService.get('id')}/update`, { idTicket: idTicket }).toPromise();

    sellTicket = async (ticket: PayloadTicket) =>
        await this.http.post<PayloadTicket>(`${environment.url}/ticket/${this.cookieService.get('id')}/sell`, ticket).toPromise();

    getAllTickets = async () =>
        await this.http.get<Ticket[]>(`${environment.url}/ticket/${this.cookieService.get('id')}/tickets`).toPromise();

    getTicketsForReceptionists = async () =>
        await this.http.get<any>(`${environment.url}/receptionist/${this.cookieService.get('id')}/incoming`).toPromise();

    deleteTicket = async (idSale: string) =>  
        await this.http.post<{tickets: Ticket[]}>(`${environment.url}/receptionist/${this.cookieService.get('id')}/incominglist`, { idSale: idSale }).toPromise();

    sendGift = async () => await this.http.post<any>(`${environment.url}/ticket/${this.cookieService.get('id')}/gift`, {}).toPromise();


}
