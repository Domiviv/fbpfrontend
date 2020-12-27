import {OrderStatus} from './OrderStatus.model';
import {User} from './User.model';
import {SoldItem} from './SoldItem.model';

export class Order {
  idOrder: number;
  orderDt: Date;
  pickupDt: Date;
  user: User;
  status: OrderStatus;
  soldItems: SoldItem[];

  constructor() {
  }
}
