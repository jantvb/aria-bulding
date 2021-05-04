import { Apartment } from 'src/app/model/apartment.model';

export class Floor {

  id!:                number;
  name!:              string;
  apartments:         Array<Apartment> = new Array<Apartment>();
  type!:              number;

}
