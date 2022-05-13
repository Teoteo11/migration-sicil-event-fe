import { Component, Input, OnInit, Output,EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pr } from 'src/app/models/user';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list-pr',
  templateUrl: './list-pr.component.html',
  styleUrls: ['./list-pr.component.scss']
})
export class ListPRComponent implements OnInit {

  @Input() listPR: Pr[] = [];
  // @Output() changeView = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges) {
    this.listPR = changes.listPR.currentValue;
  }

  goToPR = () => {
    this.router.navigate(['tickets']);
    // this.changeView.emit(true);
    // this.commonService.newEvent(true);
  }

}
