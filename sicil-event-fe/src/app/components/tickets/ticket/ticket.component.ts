import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket: Ticket;
  role = '';

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private ticketService: TicketsService,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.role = this.cookieService.get('role');
  }

  edit = () => this.router.navigate(['homepage', this.ticket._id]);

  delete = async () => {
    try {
      await this.ticketService.deleteTicket(this.ticket._id) && (
        this.router.navigate(['homepage']),
        this.snackBar.open('BIGLIETTO RIMOSSO', 'X', { duration: 1500, panelClass: ['custom-snackbar-complete'] })
      )
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar-complete'] })
    }
  }
  

}
