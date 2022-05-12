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

    // @Input() fieldFilter: 'PAID' | 'NOTPAID' | 'GIFT';
    @Input() tickets: Ticket[];

    originalTickets: Ticket[] = [];
    sendFieldToFilter: string = 'NOTPAID';
    textValue: string;

    constructor(private location: Location) { }

    ngOnInit() {}

    findSomeName = (nameOrSurname: string) => this.originalTickets.some( ({name, surname}) => (name === nameOrSurname || surname === nameOrSurname));

    controlFilter = (type: 'PAID' | 'NOTPAID' | 'GIFT') => {
        if (this.textValue === Type.BACKSTAGE || this.textValue === Type.DANCE_FLOOR) {
            this.tickets = this.originalTickets.filter( ({type}) => type === this.textValue ).filter( ({status}) => status === type);
        } else if (this.findSomeName(this.textValue)) {
            this.tickets = this.originalTickets.filter( item => (item.name === this.textValue || item.surname === this.textValue))
                                               .filter( ({status}) => status === type );
        } else {
            this.tickets = this.originalTickets.filter( ({idSale}) => idSale === this.textValue );
        }
    } 
    
    filterArray = () => {
        if (this.textValue === '') {
            this.tickets = this.originalTickets.filter( item => item.status ===  this.sendFieldToFilter);
            return;
        }
        if (this.sendFieldToFilter === Status.PAID) {
            this.controlFilter(this.sendFieldToFilter);
        } else if (this.sendFieldToFilter === Status.NOTPAID) {
            this.controlFilter(this.sendFieldToFilter);
        } else {
            this.controlFilter((this.sendFieldToFilter) as any);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.tickets && changes.tickets.currentValue) {
                this.tickets = changes.tickets.currentValue;
                this.originalTickets = [...this.tickets];
                this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
            }
            // if (changes.fieldFilter && changes.fieldFilter.currentValue) {
            //     if (changes.fieldFilter.currentValue === Status.NOTPAID) {
            //         this.sectionActivated = Status.NOTPAID;
            //         this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
            //     } else if (changes.fieldFilter.currentValue === Status.PAID) {
            //         this.sectionActivated = Status.PAID;
            //         this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type !== Type.GIFT);
            //     } else {
            //         this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type === Type.GIFT);
            //     }
            // }
        }
    }
    
    back = () => this.location.back();

    receiveTabChoosed = ($event: string) => {
        this.sendFieldToFilter = $event;
        this.textValue = '';
        if (this.sendFieldToFilter === Status.PAID) {
            this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type !== Type.GIFT);
        } else if (this.sendFieldToFilter === Status.NOTPAID) {
            this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
        } else {
            this.tickets = this.originalTickets.filter(item => item.status === Status.PAID && item.type === Type.GIFT);
        }
    }

}


