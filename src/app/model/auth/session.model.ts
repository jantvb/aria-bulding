import { Building } from "../building.model";
import { User } from "../user.model";

export class Session {

  token!: string;
  user!: User;
  building!: Building;

}
