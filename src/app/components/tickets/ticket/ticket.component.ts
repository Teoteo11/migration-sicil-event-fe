import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket: Ticket;
  @Output() isReceptionist = new EventEmitter<boolean>(false);

  role = '';

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private ticketService: TicketsService,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    this.role = this.cookieService.get('role');
  }

  edit = () => this.router.navigate(['homepage', this.ticket._id]);

  delete = async () => {
    try {
      await this.ticketService.deleteTicket(this.ticket.idSale) && (
        this.isReceptionist.emit(true),
        this.snackBar.open('BIGLIETTO RIMOSSO', 'X', { duration: 1500, panelClass: ['custom-snackbar-complete'] })
      )
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] })
    }
  }

  openDialog(): void {
    const dialogData = {
      width: '360px',
      height: '500px',
      data: {
        title: 'Sei sicuro di voler eliminare il biglietto?',
        message: 'Azione non reversibile',
        actionClick: () => this.delete()
      }
    }
    this.dialog.open(DialogComponent, dialogData);
  }
  

}
