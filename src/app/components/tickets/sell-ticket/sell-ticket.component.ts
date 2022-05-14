import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayloadTicket, Status, Ticket, Type } from 'src/app/models/ticket';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie';

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
        // if ((Number(this.cookieService.get('totalTickets')) + 1) % 21 === 0) {
        //   const ticketFree = { 
        //     name: this.cookieService.get('name'),
        //     surname: this.cookieService.get('surname'),
        //     email: this.cookieService.get('email'), 
        //     typeTicket: Type.GIFT, 
        //     status: Status.PAID 
        //   };
        //   console.log('ECCO IL TUO OMAGGIO: ',ticket);
        //   this.snackBar.open('HAI VINTO UN OMAGGIO, CONTROLLA LA TUA POSTA ELETTRONICA','X', {duration: 4500, panelClass: ['custom-snackbar-complete']});
        //   // await this.ticketService.sellTicket(ticketFree) && this.router.navigate(['homepage']);
        //   return;
        // } 
        this.submitted = false;
        await this.ticketService.sellTicket(ticket) && this.router.navigate(['homepage']);
        this.snackBar.open('BIGLIETTO VENDUTO','X', {duration: 1500, panelClass: ['custom-snackbar-complete']});
        this.ticketForm.reset();
      }
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error),'X', {duration: 1500, panelClass: ['custom-snackbar']});
    }
  }

  back = () => this.router.navigate(['homepage']);

}
