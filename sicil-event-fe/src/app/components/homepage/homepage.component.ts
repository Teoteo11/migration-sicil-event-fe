import { Component, OnInit } from '@angular/core';
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
  totalTickets = 10;
  sendFieldToFilter: string = '';
  tickets: Ticket[] = [];
  listPR: Pr[] = [];

  constructor(private cookieService: CookieService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private prService: PrService,
              private ticketService: TicketsService) {}

  async ngOnInit() {
    this.role = this.cookieService.get('role') as Role;
    try { 
      if (this.role) {
        if (this.role === Role.PR) {
          // PR
          this.tickets = await this.ticketService.getTickets();
          this.totalTickets = this.tickets.length;
        } else if (this.role === Role.ADMIN) {
          // ADMIN
          console.log('admin');
          this.listPR = await this.prService.getPrOfAdmin();
        } else {
          // RECEPTIONIST
          const data = await this.ticketService.getTicketsForReceptionists();
          data && (this.tickets = data.tickets, this.totalTickets = data.incomingNumber);
        }
      }
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
    }
  }

}
