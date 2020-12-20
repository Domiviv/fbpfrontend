import {Component, OnDestroy, OnInit} from '@angular/core';

import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/Item.model';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.scss']
})
export class HomeItemsComponent implements OnInit, OnDestroy {

  isAdmin = false;
  isCustomer = false;
  items: Item[];
  cartItem = new Item();
  itemSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorageService.getRole() === 'ROLE_ADMINISTRATEUR';
    this.isCustomer = this.tokenStorageService.getRole() === 'ROLE_CLIENT';

    this.itemSubscription = this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
      }, error => {
        console.log(error);
      }
    );
  }

  onAdd(idItem): void {
    if (this.isCustomer) {
      this.cartSubscription = this.itemService.getItemById(idItem).subscribe(
        (item) => {
          this.cartService.addToCart(item);
          location.reload();
        }
      );
    }
    else {
      alert('Veuillez vous inscrire ou vous connecter pour reserver');
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) { this.itemSubscription.unsubscribe(); }
    if (this.cartSubscription) { this.cartSubscription.unsubscribe(); }
  }
}
