import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Role } from 'src/app/models/user';

@Component({
  selector: 'app-counter-total',
  templateUrl: './counter-total.component.html',
  styleUrls: ['./counter-total.component.scss']
})
export class CounterTotalComponent implements OnInit {

  @Input() totalTickets: number;
  
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    // this.cookieService.get('role') === Role.PR && this.cookieService.put('totalTickets', String(this.totalTickets))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      (this.cookieService.get('role') === Role.PR && changes.totalTickets.currentValue) && this.cookieService.put('totalTickets', String(this.totalTickets))
    }
  }
}