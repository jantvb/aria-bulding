import { User } from './user.model';

export class Role {

  id!:            number;
  name!:          string;
  users:          Array<User> = new Array<User>();

}
