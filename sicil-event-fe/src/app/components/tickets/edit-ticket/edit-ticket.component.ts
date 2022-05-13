import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  ticket: Ticket = undefined;
  error = '';

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private ticketService: TicketsService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    try {
      const data = await this.ticketService.getTickets();
      data && (this.ticket = data.find(({ _id }) => _id === this.route.snapshot.params.id));
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] });
    }
  }

  back = () => this.router.navigate(['homepage']);

  changeStatus = async () => {
    console.log('ciao');
    this.ticketService.updateTicket(this.ticket._id)
      .subscribe(
        item => {
          if (item) {
            this.snackBar.open('BIGLIETTO VENDUTO', 'X', { duration: 1500, panelClass: ['custom-snackbar-complete'] });
            this.router.navigate(['homepage'])
          }
        },
        error => this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] })
      );
  }


}
