import { User } from './user.model';

export class Role {

  id!:            number;
  role!:          string;
  users:         Array<User> = new Array<User>();

}
