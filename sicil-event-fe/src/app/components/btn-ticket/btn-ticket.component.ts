import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { filter } from 'rxjs/operators';
import { Role } from 'src/app/models/user';

@Component({
  selector: 'app-btn-ticket',
  templateUrl: './btn-ticket.component.html',
  styleUrls: ['./btn-ticket.component.scss']
})
export class BtnTicketComponent implements OnInit {

  url = '';

  constructor(private router: Router,
    private cookieService: CookieService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.url = event.url);
  }

  ngOnInit(): void {
  }

  sellTicket = () => this.router.navigate(['sell-ticket'])

  showBtn = () => this.url === '/homepage' && (this.cookieService.get('role') && this.cookieService.get('role') === Role.PR)

}
