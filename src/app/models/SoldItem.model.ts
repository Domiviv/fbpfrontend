import {Item} from './Item.model';
import {Order} from './Order.model';

export class SoldItem{
  idSoldItem: number;
  item: Item;
  order: Order;
}
