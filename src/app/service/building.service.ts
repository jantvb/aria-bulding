import { Building } from './../model/building.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  path: string = environment.apiURL + 'building';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Building>> {
    return this.httpC.get<Array<Building>>(this.path);
  }

  get(id: number): Observable<Building> {
    return this.httpC
               .get<Building>(this.path + '/' + id)
               .pipe(tap( b => console.log(b)));
  }

  createOrUpdate(building: Building): Observable<Building> {
    return this.httpC.post<Building>(this.path, building);
  }

  delete(id: number): Observable<Building> {
    return this.httpC.delete<Building>(this.path + '/' + id);
  }

}
