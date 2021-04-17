import { Building } from "../building.model";
import { Role } from "../role.model";
import { User } from "../user.model";

export class Session {

  token!:         string;
  user!:          User;
  building!:      Building;
  role!:          Role;

}
