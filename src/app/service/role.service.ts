import { Role } from './../model/role.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  path = 'role';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Role>> {
    return this.httpC.get<Array<Role>>(environment.apiURL + this.path);
  }

  get(id: number): Observable<Role> {
    return this.httpC.get<Role>(environment.apiURL + this.path + '/' + id);
  }

  createOrUpdate(role: Role): Observable<Role> {
    return this.httpC.put<Role>(environment.apiURL + this.path, role);
  }

  delete(id: number): Observable<Role> {
    return this.httpC.delete<Role>(environment.apiURL + this.path + '/' + id);
  }

}
