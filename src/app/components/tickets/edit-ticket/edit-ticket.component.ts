import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Status, THESHOLD_GIFT, Ticket, Type } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

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
    private dialog: MatDialog,
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
        this.checkGift() ? this.openDialog() : this.router.navigateByUrl('homepage');     
      }
      setTimeout(() => {
        this.isClicked = false;
      }, 0);
    } catch (error) {
      error && this.snackBar.open(this.authService.handleErrorStatus(error), 'X', { duration: 1500, panelClass: ['custom-snackbar'] })
    }
  }

  checkGift = () => {
    if (this.checkValue() % THESHOLD_GIFT === 0) {
      return true;
    } else {
      return false;
    }
  }

  checkValue = () => {
    let test = Number(this.cookieService.get('totalTicketsPaid'));
    return test += 1;
  }


  redeemGift = async () => {
    try {
      const res = await this.ticketService.sendGift(); 
      if (res) {
        this.snackBar.open('CONTROLLA LA POSTA ELETTRONICA PER IL TUO OMAGGIO','X', {duration: 1500, panelClass: ['custom-snackbar-complete']});
        this.router.navigateByUrl('homepage');
      }
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error),'X', {duration: 1500, panelClass: ['custom-snackbar']});
    }
  }
  
  openDialog(): void {
    const dialogData = {
      width: '360px',
      height: '500px',
      data: {
        title: 'Hai vinto un biglietto omaggio',
        message: 'Controlla la tua posta elettronica. Azione non reversibile',
        actionClick: () => {},
        showInputField: true
      }
    }
    const dialog = this.dialog.open(DialogComponent, dialogData);
    dialog.afterClosed().subscribe(result => {
      this.redeemGift();
    });
  }



}
