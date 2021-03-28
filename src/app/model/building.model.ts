import { Apartment } from './apartment.model';

export class Building {

  id?:                 number;
  name?:               string;
  description?:        string;
  apartments?:         Array<Apartment> = new Array<Apartment>();

}
