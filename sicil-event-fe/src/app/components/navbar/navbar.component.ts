import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showArrowBack = false;

  constructor(private authService: AuthService, 
              private router: Router,
              // private commonService: CommonService,
              private cookieService: CookieService) {}

  ngOnInit(): void {
    // this.commonService.events$.forEach(event => this.showArrowBack = event);
  }

  logout = () => this.authService.logout();
  
  goToSellTickets = () => this.router.navigate(['sell-ticket']);

  showTabSell = () => this.cookieService.get('role') === Role.PR;

  back = () => {
    this.router.navigate(['homepage'])
    // this.commonService.newEvent(false);
  }

}
