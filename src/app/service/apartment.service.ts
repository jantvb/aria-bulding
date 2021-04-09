import { environment } from './../../environments/environment';
import { Apartment } from './../model/apartment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  path = 'apartment';

  constructor(private httpC: HttpClient) { }

  list(): Observable <Array<Apartment>> {
    return this.httpC.get<Array<Apartment>>(environment.apiURL + this.path);
  }

  get(id: number): Observable<Apartment> {
    return this.httpC.get<Apartment>(environment.apiURL + this.path + '/' + id);
  }

  createOrUpdate(apartment: Apartment): Observable<Apartment> {
    return this.httpC.post<Apartment>(environment.apiURL + this.path, apartment);
  }

  delete(id: number): Observable<Apartment> {
    return this.httpC.delete<Apartment>(environment.apiURL + this.path + '/' + id);
  }

  listByBuildingId(id: number): Observable <Array<Apartment>> {
    return this.httpC.get<Array<Apartment>>(environment.apiURL + this.path + '/building/' + id);
  }

}
