import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss']
})

export class ChooseRoleComponent {

  role: Observable<string>;

  constructor(
    private router: Router, 
    private cookieService: CookieService) {}

  setRole = (role: 'ADMIN' | 'PR' | 'RECEPTIONIST') => {
    this.cookieService.put('role', role);
    this.router.navigate(['login'])
  }

}
