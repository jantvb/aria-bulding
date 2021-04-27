import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
               .pipe(
                  tap(),
                  catchError((error: HttpErrorResponse) => {

                    if (error.status === 401 || 403) {
                      this.authService.logout();
                    }

                    swal.fire('Opps something happen', error.message, 'error');

                    // this.snackBar
                    //       .open(error.message,
                    //             'Dismiss',
                    //             {duration: 3500});

                    return throwError(error);
                  })
               )

  }



}
