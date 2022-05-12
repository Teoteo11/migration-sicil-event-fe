import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { LoaderService } from '../services/loader.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService, 
                private  cookieService: CookieService) {}


    public baseHeader: HttpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    });

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq: HttpRequest<any>;
    if (!req.url.includes('login')) {
        const token = this.cookieService.get('accessToken') && this.cookieService.get('accessToken');
        modifiedReq = req.clone({ 
            headers: this.baseHeader.set('Authorization', `Bearer ${token}`)
        });
    } else {
        modifiedReq = req.clone({ 
            headers: this.baseHeader
        });
    }
    return next.handle(modifiedReq);
  }
}