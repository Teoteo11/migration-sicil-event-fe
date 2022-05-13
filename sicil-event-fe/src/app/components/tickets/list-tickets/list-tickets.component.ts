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
    role: string;

    constructor(private location: Location, private cookieService: CookieService) { }

    ngOnInit() {
        this.role = this.cookieService.get('role');
    }

    findSomeName = (nameOrSurname: string) => this.originalTickets.some( ({name, surname}) => (name === nameOrSurname || surname === nameOrSurname));

    findSomeIdSale = (idSale: string) => this.originalTickets.some( ({idSale}) => idSale === idSale);


    controlFilter = (filterfield: string, type: 'PAID' | 'NOTPAID' | 'GIFT') => {
        if (filterfield === Type.BACKSTAGE || filterfield === Type.DANCE_FLOOR) {
            this.tickets = this.originalTickets.filter( ({type}) => type === filterfield ).filter( ({status}) => status === type);
        } else if (this.findSomeName(filterfield)) {
            this.tickets = this.originalTickets.filter( item => (item.name === filterfield || item.surname === filterfield))
                                               .filter( ({status}) => status === type );
        } else {
            this.tickets = this.originalTickets.filter( ({idSale}) => idSale === filterfield );
        }
    } 
    
    filterArray = () => {
        if (this.role === Role.RECEPTIONIST) {
            if (this.textValue === '') {
                this.tickets = [...this.originalTickets];
                return;
            }
            //IDSALE
            this.findSomeIdSale(this.textValue) && (this.tickets = this.originalTickets.filter( ({idSale}) => idSale === this.textValue));
            //NAME - SURNAME
            this.findSomeName(this.textValue) && (this.tickets = this.originalTickets.filter( ({name, surname}) => (name === this.textValue || surname === this.textValue)));
            // TYPE
            if (this.textValue === Type.BACKSTAGE || this.textValue === Type.DANCE_FLOOR) {
                this.tickets = this.originalTickets.filter( ({type}) => type === this.textValue );
            }
            // STATUS
            if (this.textValue === Status.PAID || this.textValue === Status.NOTPAID) {
                this.tickets = this.originalTickets.filter( ({status}) => status === this.textValue );
            }
            return;
        }
        if (this.textValue === '') {
            this.tickets = this.originalTickets.filter( item => item.status ===  this.sendFieldToFilter);
            return;
        }
        let temp = this.textValue;
        temp = this.textValue.toLowerCase();
        if (this.sendFieldToFilter === Status.PAID) {
            this.controlFilter(temp, this.sendFieldToFilter);
        } else if (this.sendFieldToFilter === Status.NOTPAID) {
            this.controlFilter(temp, this.sendFieldToFilter);
        } else {
            this.controlFilter(temp, (this.sendFieldToFilter) as any);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.tickets && changes.tickets.currentValue) {
                this.tickets = changes.tickets.currentValue;
                this.originalTickets = [...this.tickets];
                if (this.role !== Role.RECEPTIONIST) {
                    this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID);
                }
            }
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


