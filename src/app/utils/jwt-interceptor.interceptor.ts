import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request);

    let token: string = this._cookieService.get('token');

    // Clona todo el encabezado y le añade el token de autorización para enviarlo al Servidor con la llamada HTTP que hace el servicio
    if(token)
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401)
          this.router.navigate(['/inicio'])
        return throwError(() => error);
      })
    );
  }
}