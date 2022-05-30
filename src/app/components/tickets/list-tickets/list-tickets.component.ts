import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Ticket, Type, Status } from 'src/app/models/ticket';
import { Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.scss']
})

export class ListTicketsComponent implements OnInit {

    @Input() tickets: Ticket[];
    // @Output() sendTotalForReceptionist = new EventEmitter<number>();

    originalTickets: Ticket[] = [];
    totalTicketsNumber: number;
    totalBackStage: number;
    totalDanceFloor: number;
    totalGift: number;
    totalNotPaid: number;
    sendFieldToFilter: string = 'NOTPAID';
    textValue: string;
    role: string;

    constructor(private location: Location, 
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private authService: AuthService,
                private ticketService: TicketsService,
                private commonService: CommonService,
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
                        this.totalTicketsNumber = this.originalTickets.filter(({status, type}) => status === Status.PAID && type !== Type.GIFT).length;     
                        this.totalBackStage = this.originalTickets.filter( ({status, type}) => type === Type.BACKSTAGE && status === Status.PAID).length,
                        this.totalDanceFloor = this.originalTickets.filter( ({status, type}) => type === Type.DANCE_FLOOR && status === Status.PAID).length,
                        this.totalGift = this.originalTickets.filter( ({type}) => type === Type.GIFT).length,
                        this.totalNotPaid = this.originalTickets.filter(({status}) => status === Status.NOTPAID).length
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
        let filteredTicketsTab = this.role !== Role.RECEPTIONIST 
        ? this.originalTickets.filter( ({status, type}) => (status === this.sendFieldToFilter || type === this.sendFieldToFilter)) 
        : this.originalTickets;
        if (this.sendFieldToFilter === Status.PAID) {
            filteredTicketsTab = filteredTicketsTab.filter(({type}) => type !== Type.GIFT);
        }
        //? NO FILTER
        if (this.textValue === '') {
            this.tickets = [...filteredTicketsTab];
            return;
        }
        //? IDSALE
        if (this.sendFieldToFilter === Type.GIFT || this.sendFieldToFilter === Status.PAID || this.role === Role.RECEPTIONIST) {
            if (this.findSomeIdSale(this.textValue)) {
                return this.tickets = filteredTicketsTab.filter(({idSale}) => idSale === this.textValue);
            }
        }
        //? NAME -SURNAME
        if (this.findSomeNameOrSurname(this.textValue)) {
            return this.tickets = filteredTicketsTab.filter( ({name, surname}) => ( name === this.textValue || surname === this.textValue));
        }
        //? EMAIL
        if (this.textValue.includes('@')) {
            return this.tickets = filteredTicketsTab.filter( ({email}) => email === this.textValue );
        }
        //? TIPOLOGIA
        if (this.textValue === Type.BACKSTAGE || this.textValue === Type.DANCE_FLOOR || this.textValue === Type.GIFT) {
            return this.tickets = filteredTicketsTab.filter( ({type}) => type === this.textValue );
        }
        return this.tickets = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes.tickets && changes.tickets.currentValue) {
                this.tickets = changes.tickets.currentValue;
                this.originalTickets = [...this.tickets];
                this.totalTicketsNumber = this.originalTickets.filter( ({status, type}) => status === Status.PAID && type !== Type.GIFT).length;
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
            console.log('TICKETS: ', this.tickets),
            this.commonService.sendNumRecep(this.tickets.length.toString())
            // this.tickets.length > 0 && (this.totalTicketsNumber = this.tickets.filter( ({status, type}) => status === Status.PAID && type !== Type.GIFT).length),
            // this.sendTotalForReceptionist.emit(this.totalTicketsNumber)
        )
    }
}


