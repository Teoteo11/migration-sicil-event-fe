import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() color: string;
  @Input() disabled: boolean;
  @Output() click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {}

  buttonClick = () => this.click.emit();

}
