import { Building } from './building.model';
import { Role } from './role.model';

export class User {

  id!:                  number;
  username!:            string;
  firstname!:           string;
  lastname!:            string;
  password!:            string;
  active!:              number;
  phoneNumber!:         string;
  socialSecurity!:      number;
  defaultBuilding!:     number;
  roles:                Array<Role> = new Array<Role>();
  token!:               string;
  buildings:            Array<Building> = new Array<Building>();

}
