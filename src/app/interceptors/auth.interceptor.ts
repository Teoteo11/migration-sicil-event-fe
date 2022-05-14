import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { LoaderService } from '../services/loader.service';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService,
        private authService: AuthService,
        private cookieService: CookieService) { }


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
        return next.handle(modifiedReq).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this.authService.logout();
                }
            }));
    }
}