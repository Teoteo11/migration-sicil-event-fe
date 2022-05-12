import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Output() triggerTab = new EventEmitter<string>();
  @ViewChild('tabPay') tabPay: ElementRef;
  @ViewChild('tabNotPay') tabNotPay: ElementRef;
  @ViewChild('free') free: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  switchTab = (value: string) => {
    this.triggerTab.emit(value);
    switch (value) {
      case 'PAID':
        document.getElementById('tabPay').classList.add('bg-violet');
        document.getElementById('tabNotPay').classList.remove('bg-violet');
        document.getElementById('tabFree').classList.remove('bg-violet');
        break;
      case 'NOTPAID':
        document.getElementById('tabNotPay').classList.add('bg-violet');
        document.getElementById('tabPay').classList.remove('bg-violet');
        document.getElementById('tabFree').classList.remove('bg-violet');
        break; 
      case 'GIFT':
        document.getElementById('tabFree').classList.add('bg-violet');
        document.getElementById('tabPay').classList.remove('bg-violet');
        document.getElementById('tabNotPay').classList.remove('bg-violet');
        break;
      default:
        break;
    }
  }

}
