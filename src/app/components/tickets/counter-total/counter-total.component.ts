import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-counter-total',
  templateUrl: './counter-total.component.html',
  styleUrls: ['./counter-total.component.scss']
})
export class CounterTotalComponent {

  @Input() totalTickets: number;
  
  constructor() { }

}