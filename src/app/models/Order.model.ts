import {OrderStatus} from './OrderStatus.model';
import {User} from './User.model';
import {Item} from './Item.model';

export class Order {
  idOrder: number;
  orderDt: Date;
  pickupDt: Date;
  billNumber: string;
  user: User;
  status: OrderStatus;
  items: Item[];

  constructor() {}
}
