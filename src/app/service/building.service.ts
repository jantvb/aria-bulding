import { Building } from './../model/building.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  path = 'building';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Building>> {
    return this.httpC.get<Array<Building>>(environment.apiURL + this.path);
  }

  get(id: number): Observable<Building> {
    return this.httpC.get<Building>(environment.apiURL + this.path + '/' + id);
  }

  createOrUpdate(building: Building): Observable<Building> {
    return this.httpC.put<Building>(environment.apiURL + this.path, building);
  }

  delete(id: number): Observable<Building> {
    return this.httpC.delete<Building>(environment.apiURL + this.path + '/' + id);
  }

}
