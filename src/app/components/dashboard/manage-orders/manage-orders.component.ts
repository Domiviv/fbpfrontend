import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../models/Item.model';
import {Order} from '../../../models/Order.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../../services/item.service';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {


  items: Item[];
  orders: Order[];
  itemSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(private itemService: ItemService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.itemSubscription = this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
      }, error => {
        console.log(error);
      }
    );

    this.orderSubscription = this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        console.log(orders);
      }, error => {
        console.log(error);
      }
    );
  }

  onCancel(id: number): void {
    if (confirm('Voulez-vous vraiment annuler la commande n° ' + id + ' ?')) {
      this.orderService.cancelOrder(id);
      location.reload();
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
