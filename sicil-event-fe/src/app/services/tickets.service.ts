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

    getTickets = async (id?: string) =>
        await this.http.get<Ticket[]>(`${environment.url}/ticket/${id ? id : this.cookieService.get('id')}/prtickets`).toPromise();

    //TODO farla asincrona
    updateTicket = (idTicket: string) =>
        this.http.post<any>(`${environment.url}/ticket/${this.cookieService.get('id')}/update`, { idTicket: idTicket });

    sellTicket = async (ticket: PayloadTicket) =>
        await this.http.post<PayloadTicket>(`${environment.url}/ticket/${this.cookieService.get('id')}/sell`, ticket).toPromise();

    getAllTickets = async () =>
        await this.http.get<Ticket[]>(`${environment.url}/ticket/${this.cookieService.get('id')}/tickets`).toPromise();

    getTicketsForReceptionists = async () =>
        await this.http.get<ReceptionistData>(`${environment.url}/receptionist/${this.cookieService.get('id')}/incoming`).toPromise()


}
