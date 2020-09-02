import {Measure} from './Measure.model';
import {Allergen} from './Allergen.model';

export class Item {
  idItem: number;
  label: string;
  price: number;
  descr: string;
  qt: number;
  measure: Measure;
  allergens: Allergen[];

  constructor() {
  }
}
