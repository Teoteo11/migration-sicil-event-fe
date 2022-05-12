import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToEdit = () => {
    console.log('ticket: ',this.ticket);
    this.router.navigate([`edit-ticket/${this.ticket._id}`], {state: { ticket: this.ticket}})
  }

}
