import { Injectable } from '@angular/core';
import { Session } from 'src/app/model/auth/session.model';
import { Building } from 'src/app/model/building.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  save(session: Session): void {

    sessionStorage.clear();

    sessionStorage.setItem('session',
                           JSON.stringify(session));

  }

  remove(): void {

    sessionStorage.clear();

  }

  load(): Session {

    const storedSession: string | null = sessionStorage.getItem('session');

    return storedSession !== null
            ? JSON.parse(storedSession) as Session
            : new Session();
  }

  loadUser(): User {
    return this.load().user;
  }

  loadToken(): string {
    return this.load().token;
  }

  loadBuilding(): Building {
    return this.load().building;
  }

}
