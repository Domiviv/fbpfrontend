import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../models/Item.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../services/item.service';
import {Order} from '../../models/Order.model';
import {OrderService} from '../../services/order.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {User} from '../../models/User.model';
import {SoldItem} from '../../models/SoldItem.model';
import {SoldItemService} from '../../services/soldItem.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  items: Item[];
  orders: Order[];
  soldItems: SoldItem[];
  user: User;
  order: Order;
  orderSubscription: Subscription;

  constructor(private itemService: ItemService,
              private orderService: OrderService,
              private tokenStorageService: TokenStorageService,
              private soldItemService: SoldItemService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.orderSubscription = this.orderService.getOrdersByUserEmail(this.tokenStorageService.getUser()).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        console.log(orders);
      }, error => {
        console.log(error);
      }
    );
  }

  onClick(orderModal, order: Order): void {
    this.order = order;
    this.modalService.open(orderModal, {scrollable: true, centered: true});
  }

  onCancel(id: number): void {
    if (confirm('Voulez-vous vraiment annuler la commande n° ' + id + ' ?')) {
      this.orderService.cancelOrder(id);
      location.reload();
    }
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
