import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => this.checkLogin(state.url);
  
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean =>
     this.canActivate(route, state);

  canLoad = (route: Route): boolean => this.checkLogin(`/${route.path}`);

  checkLogin = (url: string): boolean => {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['homepage']);
      return true; 
    }
    return true;
  }
  
}
