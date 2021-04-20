import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = environment.apiURL + 'auth/';

  constructor(private httpC: HttpClient, private sessionService: SessionService) { }

  login(user: User): Observable<User> {

    return this.httpC.post<User>(this.path + 'login', user).pipe(tap( user => this.sessionService.save(user) ));

  }

  logout(): Observable<void> {

    return this.httpC.get<void>(this.path + 'logout');

  }

}
