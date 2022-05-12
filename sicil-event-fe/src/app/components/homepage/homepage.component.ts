import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Ticket } from 'src/app/models/ticket';
import { Role } from 'src/app/models/user';
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

  constructor(private cookieService: CookieService,
              private ticketService: TicketsService) {}

  async ngOnInit() {
    this.role = this.cookieService.get('role') as Role;
    //BIGLIETTI PER IL PR
    if (this.role) {
      if (this.role === Role.PR) {
        this.tickets = await this.ticketService.getTickets();
        this.totalTickets = this.tickets.length;
      }
    }
    //LISTA PR DEGLI ADMIN E RELATIVI BIGLIETTI
    //BIGLIETTI PER RECEPTIONIST
  }

  receiveTabChoosed = ($event: string) => this.sendFieldToFilter = $event;

}
