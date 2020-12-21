import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../models/Item.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../services/item.service';
import {Order} from '../../models/Order.model';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  items: Item[];
  orders: Order[];
  itemSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(private itemService: ItemService,
              private orderService: OrderService) { }

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
    if (confirm('Voulez-vous vraiment annuler la commande n° ' + id + ' ?')){
      this.orderService.cancelOrder(id);
      location.reload();
    }
  }

  ngOnDestroy(): void {
   if (this.itemSubscription) { this.itemSubscription.unsubscribe(); }
   if (this.orderSubscription) { this.orderSubscription.unsubscribe(); }
  }

}