import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { Pr } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PrService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  getPrOfAdmin = async () =>
    await this.http.get<Pr[]>(`${environment.url}/pr/${this.cookieService.get('id')}/adminpr`).toPromise();

}
