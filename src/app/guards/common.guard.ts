import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { Role } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonGuard implements CanActivate {

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private cookieService: CookieService) {}

  canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => this.checkLogin(state.url);

  checkLogin = (url: string): boolean => {
    if (this.authService.isLoggedIn() &&  (url === '/login' || url === '/choose-role')) {
      this.router.navigate(['homepage']);
      return true;
    }
    //ONLY FOR ADMIN
    if (this.cookieService.get('role') === Role.ADMIN && url === '/sell-ticket') {
      this.router.navigate(['homepage']);
      return true;
    }
    //FOR NOT CREATE LOOP ROUTING
    if (url === '/login') {
      if(!this.cookieService.get('role')) {
        this.router.navigate(['choose-role']);
        return true;
      } else {
        return true;
      }
    }
    if (this.authService.isLoggedIn()) {
      return true; 
    }
    this.router.navigate(['choose-role']);
    return true;
  }
  
}
