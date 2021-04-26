import { Injectable } from '@angular/core';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  save(user: User): void {

    sessionStorage.clear();

    sessionStorage.setItem('user-aria',
                           JSON.stringify(user));

  }

  remove(): void {

    sessionStorage.clear();

  }

  load(): User {

    const storedSession: string | null = sessionStorage.getItem('user-aria');

    return storedSession !== null
            ? JSON.parse(storedSession) as User
            : new User();
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

  hasToken(): boolean {
    return this.load() !== undefined &&
            this.load().token !== undefined
  }

}
