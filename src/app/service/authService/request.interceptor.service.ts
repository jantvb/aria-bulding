import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor{

  constructor(private sessionService: SessionService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req.clone({headers: req.headers
                                              .set('Authorization',
                                                   'Bearer ' + this.sessionService.loadToken)}));
                                                                                }
}
