import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Status, Ticket, Type } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  ticket: Ticket = undefined;
  isClicked = false;
  error = '';

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cookieService: CookieService,
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
    try {
      if (this.isClicked) return;
      this.isClicked = true;
      const res = await this.ticketService.updateTicket(this.ticket._id);
      if (res) {
        this.snackBar.open('PAGAMENTO AVVENUTO', 'X', { duration: 1100, panelClass: ['custom-snackbar-complete'] });
        if ((Number(this.cookieService.get('totalTicketsPaid')) + 1) % 26 === 0) {
          const ticketFree = { 
            name: this.cookieService.get('name'),
            surname: this.cookieService.get('surname'),
            email: this.cookieService.get('email'), 
            typeTicket: Type.GIFT, 
            status: Status.PAID 
          };
          this.snackBar.open('HAI VINTO UN OMAGGIO, CONTROLLA LA TUA POSTA ELETTRONICA','X', {duration: 1500, panelClass: ['custom-snackbar-complete']});
          await this.ticketService.sellTicket(ticketFree) && this.router.navigate(['homepage']);
          return;
        } else {
          this.router.navigate(['homepage']);
        }
      }
      setTimeout(() => {
        this.isClicked = false;
      }, 0);
    } catch (error) {
      error && this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] })
    }
  }


}