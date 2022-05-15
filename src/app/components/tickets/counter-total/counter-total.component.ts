import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-counter-total',
  templateUrl: './counter-total.component.html',
  styleUrls: ['./counter-total.component.scss']
})
export class CounterTotalComponent implements OnInit {

  role = '';
  @Input() totalTickets: number;
  
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.role = this.cookieService.get('role');
  }



}