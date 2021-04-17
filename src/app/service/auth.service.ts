import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/loginResponse.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = environment.apiURL + 'auth/';

  constructor(private httpC: HttpClient) { }

  login(user: User): Observable<LoginResponse> {

    return this.httpC.post<LoginResponse>(this.path + 'login', user);

  }

  logout(): Observable<void> {
    return this.httpC.get<void>(this.path + 'logout');
  }

}
