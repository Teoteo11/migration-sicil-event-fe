import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { removeDuplicatesPostUpdate } from 'src/app/helpers/removeDuplicatesPostUpdate';
import { Status, Ticket, Type } from 'src/app/models/ticket';
import { Pr, Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { PrService } from 'src/app/services/pr.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  role: Role;
  totalTickets: number;
  totalBackStage: number;
  totalDanceFloor: number;
  totalGift: number;
  totalNotPaid: number;
  sendFieldToFilter: string = '';
  sendNumberToReceptionist: number;
  tickets: Ticket[] = [];
  listPR: Pr[] = [];

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    setTimeout(() => window.history.forward(), 0);
    window.onunload = () => null;
    return;
  }

  constructor(private cookieService: CookieService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private commonService: CommonService,
              private prService: PrService,
              private ticketService: TicketsService) {
                
              } 
                
  async ngOnInit() {
    console.log('ciao');
    this.commonService.eventsRecep$.forEach( event => this.sendNumberToReceptionist = event)
    this.role = this.cookieService.get('role') as Role;
    try { 
      if (this.role) {
        // PR
        if (this.role === Role.PR) {
          this.tickets = await this.ticketService.getTickets();
          this.tickets = [...new Set(removeDuplicatesPostUpdate(this.tickets))];
          this.tickets && this.tickets.length > 0 && (this.totalTickets = this.tickets.filter(({status, type}) => status === Status.PAID && type !== Type.GIFT).length);
          // totalTicketsPaid
          const ticketsPaid = this.tickets.filter( item => item.status === Status.PAID).length;
          this.cookieService.put('totalTicketsPaid', String(ticketsPaid));
        } else if (this.role === Role.ADMIN) {
          // ADMIN
          this.listPR = await this.prService.getPrOfAdmin();
          this.listPR.map( async item => {
            let data = await this.ticketService.getTicketsOfSpecificPR(item.id);
           data = [...new Set(removeDuplicatesPostUpdate(data))];
            data.length > 0 && (
              this.totalTickets = data.filter( ({status, type}) => status === Status.PAID && type !== Type.GIFT).length,
              this.totalBackStage = data.filter( ({status, type}) => type === Type.BACKSTAGE && status === Status.PAID).length,
              this.totalDanceFloor = data.filter( ({status, type}) => type === Type.DANCE_FLOOR && status === Status.PAID).length,
              this.totalGift = data.filter( ({type}) => type === Type.GIFT).length,
              this.totalNotPaid = data.filter(({status}) => status === Status.NOTPAID).length
            );
          });
        } else {
          // RECEPTIONIST
          this.tickets = (await this.ticketService.getTicketsForReceptionists()).tickets;
          this.tickets && this.tickets.length > 0 && (this.totalTickets = this.tickets.length);
        }
        }
      }
     catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
    }
  }
  


    
}
