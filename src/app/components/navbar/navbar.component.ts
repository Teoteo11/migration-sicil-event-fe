import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Role } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name = '';
  url = '';
  routeSub: Subscription;

  constructor(private authService: AuthService, 
              private router: Router,
              private location: Location,
              private commonService: CommonService,
              private cookieService: CookieService) {
                this.routeSub = router.events.pipe(
                  filter(event => event instanceof NavigationEnd))
                  .subscribe((event: NavigationEnd) => this.url = event.url);
              }

  ngOnInit(): void {
    this.commonService.events$.forEach(event => this.name = event);
    this.name = this.cookieService.get('name') ? this.cookieService.get('name') : 'SicilEvent' ;
  }

  logout = () => this.authService.logout();
  
  goToSellTickets = () => this.router.navigate(['sell-ticket']);

  showTabSell = () => this.cookieService.get('role') === Role.PR;

  back = () => this.location.back();

  showArrowBack = () => this.cookieService.get('role') === Role.ADMIN && this.url.includes('tickets');

  ngOnDestroy() {
    routeSub: Subscription;
  }
  

}
