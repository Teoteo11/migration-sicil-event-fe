import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Ticket, Type, Status } from 'src/app/models/ticket';
import { Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.scss']
})

export class ListTicketsComponent implements OnInit {

    @Input() tickets: Ticket[];

    originalTickets: Ticket[] = [];
    totalTicketsNumber: number;
    sendFieldToFilter: string = 'NOTPAID';
    textValue: string;
    role: string;

    constructor(private location: Location, 
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private authService: AuthService,
                private ticketService: TicketsService,
                private cookieService: CookieService) { }

    async ngOnInit() {
        this.role = this.cookieService.get('role');
        if (this.role === Role.ADMIN) {
            if (!this.tickets) {
                try {
                    if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.id) {
                        this.tickets = await this.ticketService.getTicketsOfSpecificPR(this.route.snapshot.queryParams.id);
                        this.originalTickets = [...this.tickets];
                        this.tickets = this.originalTickets.filter(item => item.status === Status.NOTPAID); 
                        this.totalTicketsNumber = this.originalTickets.length;     
                    }
                } catch (error) {
                    this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
                }
            }
        }
    }

    findSomeNameOrSurname = (nameOrSurname: string) => this.originalTickets.some( ({name, surname}) => (name === nameOrSurname || surname === nameOrSurname));

    findSomeIdSale = (idSaleParam: string) => this.originalTickets.some( ({idSale}) => idSale === idSaleParam);
    
    filterArray = () => {
        const filteredTicketsTab = this.role !== Role.RECEPTIONIST ? this.originalTickets.filter( ({status, type}) => (status === this.sendFieldToFilter || type === this.sendFieldToFilter)) : this.originalTickets;
        //? NO FILTER
        if (this.textValue === '') {
            this.tickets = [...filteredTicketsTab];
            return;
        }
        //? IDSALE
        if (this.sendFieldToFilter === Status.PAID || this.role === Role.RECEPTIONIST) {
            // TODO serve la modifica al BE che mette gli idSale o tutto UPPERCASE o tutto LOWERCASE
            if (this.findSomeIdSale(this.textValue)) {
                this.tickets = filteredTicketsTab.filter(({idSale}) => idSale === this.textValue);
            }
        }
        //? NAME -SURNAME
        if (this.findSomeNameOrSurname(this.textValue)) {
            this.tickets = filteredTicketsTab.filter( ({name, surname}) => ( name === this.textValue || surname === this.textValue));
        }
        //? EMAIL
        if (this.textValue.includes('@')) {
            this.tickets = filteredTicketsTab.filter( ({email}) => email === this.textValue );
        }
        //? TIPOLOGIA
        if (this.textValue === Type.BACKSTAGE || this.textValue === Type.DANCE_FLOOR) {
            this.tickets = filteredTicketsTab.filter( ({type}) => type === this.textValue );
        } 
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.tickets && changes.tickets.currentValue) {
                this.tickets = changes.tickets.currentValue;
                this.originalTickets = [...this.tickets];
                this.totalTicketsNumber = this.originalTickets.length;
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

    takeEvent = async (event: boolean) => {
        event && event === true && ( 
            this.tickets = (await this.ticketService.getTicketsForReceptionists()).tickets,
            this.tickets.length > 0 && (this.totalTicketsNumber = this.tickets.length)
        )
    }

}


