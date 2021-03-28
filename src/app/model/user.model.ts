import { Role } from './role.model';

export class User {

  id?:                number;
  email?:             string;
  firstname?:         string;
  lastname?:          string;
  password?:          string;
  active?:            number;
  phoneNumber?:       string;
  socialSecurity?:    number;
  roles?:             Array<Role> = new Array<Role>();

}
