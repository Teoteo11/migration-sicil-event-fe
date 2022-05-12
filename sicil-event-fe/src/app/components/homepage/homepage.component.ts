import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Role } from 'src/app/models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  role: Role;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.role = this.cookieService.get('role') as Role;
  }

}
