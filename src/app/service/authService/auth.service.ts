import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/model/auth/session.model';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = environment.apiURL + 'auth/';

  constructor(private httpC: HttpClient) { }

  login(user: User): Observable<Session> {

    return this.httpC.post<Session>(this.path + 'login', user);

  }

  logout(): Observable<void> {

    return this.httpC.get<void>(this.path + 'logout');

  }

}
