import { Injectable } from '@angular/core';
import { Item } from '../models/Item.model';
import { Cart } from '../models/Cart.model';

const USER_CART = 'user-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Cart();

  constructor() { }

  public removeCart(): void {
    localStorage.clear();
  }

  public addToCart(item: Item): void {
    this.cart.items = [];
    if (this.getCart() !== null) {
      this.cart.items = this.getCart();
      this.cart.items.push(item);
      localStorage.setItem(USER_CART, JSON.stringify(this.cart.items));
      alert('Produit ajouté au panier !');
    }
    else {
      this.cart.items.push(item);
      localStorage.setItem(USER_CART, JSON.stringify(this.cart.items));
      alert('Produit ajouté au panier !');
    }


  }
  public getCart(): Item[] {
    return JSON.parse(localStorage.getItem(USER_CART));
  }

  public removeFromCart(idItem): void {
    this.cart.items = [];
    this.cart.items = this.getCart();
    const index: number = this.cart.items.indexOf(this.cart.items.find(item => item.idItem === idItem));
    if ( index !== -1){
      this.cart.items.splice(index, 1);
    }
    localStorage.setItem(USER_CART, JSON.stringify(this.cart.items));
  }

}
