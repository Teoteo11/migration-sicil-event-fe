import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-total',
  templateUrl: './counter-total.component.html',
  styleUrls: ['./counter-total.component.scss']
})
export class CounterTotalComponent implements OnInit {

  @Input() totalTickets: number;

  constructor() { }

  ngOnInit(): void {
  }

}
