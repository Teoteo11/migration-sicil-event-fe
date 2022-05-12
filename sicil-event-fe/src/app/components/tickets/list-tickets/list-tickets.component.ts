import { Location } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Ticket, Type, Status } from 'src/app/models/ticket';
import { Role } from 'src/app/models/user';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {

    @Input() fieldFilter: 'PAID' | 'NOTPAID' | 'GIFT';
    @Input() tickets: Ticket[];

    originalTickets: Ticket[] = [];
    sectionActivated: Status = Status.NOTPAID;
    sendFieldToFilter: string = '';

    constructor(private ticketService: TicketsService,
                private location: Location,
                private cookieService: CookieService) { }

    ngOnInit() {}
    

    filterArray = (str: string) => {
        if (str === '') {
            this.tickets = this.originalTickets.filter( item => item.status ===  this.sectionActivated);
            return;
        }
        this.tickets = this.originalTickets.filter( item => item.status === this.sectionActivated && (item.name === str || item.surname === str));
        if (str === Type.BACKSTAGE || str === Type.DANCE_FLOOR || Type.GIFT) {
            this.tickets = this.originalTickets.filter( item => item.type === str);
        }
        if (str === Status.PAID || str === Status.PAID) {
            this.tickets = this.originalTickets.filter( item => item.status === str);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.tickets && changes.tickets.currentValue) {
                this.tickets = changes.tickets.currentValue;
                this.originalTickets = [...this.tickets];
                console.log("🚀 ~ file: list-tickets.component.ts ~ line 48 ~ ListTicketsComponent ~ ngOnChanges ~ this.originalTickets", this.originalTickets)
                this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
            }
            if (changes.fieldFilter && changes.fieldFilter.currentValue) {
                if (changes.fieldFilter.currentValue === Status.NOTPAID) {
                    this.sectionActivated = Status.NOTPAID;
                    this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
                } else if (changes.fieldFilter.currentValue === Status.PAID) {
                    this.sectionActivated = Status.PAID;
                    this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type !== Type.GIFT);
                } else {
                    this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type === Type.GIFT);
                }
            }
        }
        // if (changes && changes.fieldFilter.currentValue) {
        //     this.originalTickets = changes.fieldFilter.currentValue;
            // if (changes.fieldFilter.currentValue === Status.NOTPAID) {
            //     this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
            // } else if (changes.fieldFilter.currentValue === Status.PAID) {
            //     this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type !== Type.GIFT);
            // } else {
            //     this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type === Type.GIFT);
            // }
        // }
    }
    
    back = () => this.location.back();

}


