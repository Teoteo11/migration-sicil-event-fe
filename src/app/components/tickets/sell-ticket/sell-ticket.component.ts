import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayloadTicket, Status, THESHOLD_GIFT, Ticket, Type } from 'src/app/models/ticket';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-sell-ticket',
  templateUrl: './sell-ticket.component.html',
  styleUrls: ['./sell-ticket.component.scss']
})

export class SellTicketComponent implements OnInit {

  @ViewChild('payCheckbox', {static: true}) payCheckbox: ElementRef<any>; 

  typologies = ['BACKSTAGE', 'DANCE_FLOOR'];
  tipology = new FormControl();
  ticketForm: FormGroup = undefined;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private dialog: MatDialog,
    private ticketService: TicketsService,
    private authService: AuthService,
    private cookieService: CookieService,
    ) {}

  get ticketFM() { return this.ticketForm.controls; }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      tipology: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pay: [false],
    });
  }


  onSubmit = async () => {
    this.submitted = true;
    if (this.ticketForm && this.ticketForm.invalid) {
      return;
    }
    try {
      const ticket: PayloadTicket = {
        name: this.ticketForm.get('name').value,
        surname: this.ticketForm.get('surname').value,
        typeTicket: this.ticketForm.get('tipology').value,
        email: this.ticketForm.get('email').value,
        status: this.ticketForm.get('pay').value === true ? Status.PAID : Status.NOTPAID,
      }
      if (ticket) {
        this.submitted = false;
        const res = await this.ticketService.sellTicket(ticket);
        if (res)  {
          this.snackBar.open('BIGLIETTO VENDUTO','X', {duration: 1000, panelClass: ['custom-snackbar-complete']});
          this.ticketForm.reset(); 
          this.checkGift() && ticket.status === Status.PAID ? this.openDialog() : this.router.navigateByUrl('homepage');
        };
      }
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error),'X', {duration: 1500, panelClass: ['custom-snackbar']});
    }
  }
  back = () => this.router.navigate(['homepage']);

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
        message: 'Riceverai il biglietto sulla tua posta elettronica. Azione non reversibile',
        actionClick: () => {},
        showInputField: true
      }
    }
    const dialog = this.dialog.open(DialogComponent, dialogData);
    dialog.afterClosed().subscribe(result => {
      this.redeemGift();
    });
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

}
