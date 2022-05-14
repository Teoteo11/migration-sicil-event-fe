import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie';
import { Ticket } from 'src/app/models/ticket';
import { Pr, Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PrService } from 'src/app/services/pr.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  role: Role;
  totalTickets;
  sendFieldToFilter: string = '';
  tickets: Ticket[] = [];
  listPR: Pr[] = [];

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => window.history.forward(), 0);
    window.onunload = () => null;
    return;
  }

  constructor(private cookieService: CookieService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private prService: PrService,
              private ticketService: TicketsService) {}

  async ngOnInit() {
    this.role = this.cookieService.get('role') as Role;
    try { 
      if (this.role) {
        // PR
        if (this.role === Role.PR) {
          this.tickets = await this.ticketService.getTickets();
          this.totalTickets = this.tickets.length;
          // ADMIN
        } else if (this.role === Role.ADMIN) {
          this.listPR = await this.prService.getPrOfAdmin();
          console.log('LIST PR: ', this.listPR);
          let results: Ticket[] = [];
          this.listPR.forEach( async item => {
            const data = await this.ticketService.getTicketsOfSpecificPR(item.id);
            data.length > 0 && (this.totalTickets = data.length);
          });
        }
        } else {
          // RECEPTIONIST
          const data = await this.ticketService.getTicketsForReceptionists();
          data && (this.tickets = data.tickets, this.totalTickets = data.incomingNumber);
        }
      }
     catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
    }
  }

}
