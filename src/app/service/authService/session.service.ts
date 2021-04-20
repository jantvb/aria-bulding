import { Injectable } from '@angular/core';
import { Building } from 'src/app/model/building.model';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { BuildingService } from '../building.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  save(user: User): void {

    sessionStorage.clear();

    sessionStorage.setItem('user',
                           JSON.stringify(user));

  }

  remove(): void {

    sessionStorage.clear();

  }

  load(): User {

    const storedSession: string | null = sessionStorage.getItem('session');

    return storedSession !== null
            ? JSON.parse(storedSession) as User
            : new User();
  }

  loadUser(): User {
    return this.load();
  }

  loadToken(): string {
    return this.load().token;
  }

  loadBuilding(): number {
    return this.load().defaultBuilding;
  }

  loadRole(): Array<Role> {
    return this.load().roles;
  }

}
