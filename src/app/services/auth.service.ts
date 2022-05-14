import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Role, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  role: Observable<Role> = undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) { }

  login = async (email: string, password: string) =>
    await this.http.post<User>(`${environment.url}/${this.getRole()}/login`, { email, password }).toPromise();


  getRole = (): string => {
    switch (this.cookieService.get('role')) {
      case Role.ADMIN:
        return 'admin';
      case Role.PR:
        return 'pr';
      case Role.RECEPTIONIST:
        return 'receptionist';
      default:
        break;
    }
  }

  logout = () => {
    this.cookieService.removeAll();
    this.router.navigate(['choose-role']);
  }

  isLoggedIn = (): boolean => this.cookieService.get('accessToken') ? true : false;

  handleErrorStatus = (error): string => {
    switch (error.status) {
      case 400:
        return 'Campi spediti errati'
      case 401:
        return 'Richiesta errata';
      case 403:
        return 'Non autorizzato';
      case 404:
        return 'Risorsa non trovata';
      case 409:
        return 'Conflitto dei dati';
      case 500:
        return 'Errore server';
      default:
        return 'Si è verificato un problema';
    }
  }

  storeAuthData = (authenticationData: Partial<User>): Promise<void> => {
    try {
      this.cookieService.put('id', authenticationData._id);
      this.cookieService.put('name', authenticationData.name);
      this.cookieService.put('surname', authenticationData.name);
      this.cookieService.put('email', authenticationData.name);
      this.cookieService.put('role', authenticationData.role);
      this.cookieService.put('accessToken', authenticationData.accessToken);
      this.cookieService.put('refreshToken', authenticationData.refreshToken);
    } catch (err) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}

