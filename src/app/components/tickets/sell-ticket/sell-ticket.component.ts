import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayloadTicket, Status, Ticket } from 'src/app/models/ticket';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
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
        await this.ticketService.sellTicket(ticket) && this.router.navigate(['homepage']);
        this.ticketForm.reset();
      }
    } catch (error) {
      this.snackBar.open(this.authService.handleErrorStatus(error),'X', {duration: 1500, panelClass: ['custom-snackbar']});
    }
  }

  back = () => this.router.navigate(['homepage']);

}
