import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../models/Item.model';
import {Order} from '../../../models/Order.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../../services/item.service';
import {OrderService} from '../../../services/order.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {


  items: Item[];
  orders: Order[];
  order: Order;
  itemSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(private itemService: ItemService,
              private orderService: OrderService,
              private modalService: NgbModal) {
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

  onConfirmPayment(id: number): void {
    if (confirm('Voulez-vous vraiment confirmer le paiement de la commande n° ' + id + ' ?')) {
      this.orderService.confirmPayment(id);
      location.reload();
    }
  }

  onConfirmReceipt(id: number): void {
    if (confirm('Voulez-vous vraiment confirmer l\'enlèvement de la commande n° ' + id + ' ?')) {
      this.orderService.confirmReceipt(id);
      location.reload();
    }
  }

  onClick(orderModal, order: Order): void {
    this.order = order;
    this.modalService.open(orderModal, {scrollable: true, centered: true});
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
