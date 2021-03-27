import { User } from './../model/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path = 'data/userGroup';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<User>> {
    return this.httpC.get<Array<User>>(environment.apiURL + this.path);
  }

  get(id: number): Observable<User> {
    return this.httpC.get<User>(environment.apiURL + this.path + '/' + id);
  }

  createOrUpdate(user: User): Observable<User> {
    return this.httpC.put<User>(environment.apiURL + this.path, user);
  }

  delete(id: number): Observable<User> {
    return this.httpC.delete<User>(environment.apiURL + this.path + '/' + id);
  }

}
