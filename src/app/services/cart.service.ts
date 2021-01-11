import {Injectable} from '@angular/core';
import {Cart} from '../models/Cart.model';
import {User} from '../models/User.model';
import {Stock} from '../models/Stock.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Cart();
  userEmail: string;
  user: User;

  constructor() {
  }

  // Supprime le panier
  public removeCart(): void {
    localStorage.clear();
  }

  // Ajout un produit au panier du client
  public addToCart(stock: Stock, id: string): void {
    this.cart.stocks = [];
    if (this.getCart(id) !== null) {
      this.cart.stocks = this.getCart(id);
      this.cart.stocks.push(stock);
      localStorage.setItem(id, JSON.stringify(this.cart.stocks));
      alert('Produit ajouté au panier !');
    } else {
      this.cart.stocks.push(stock);
      localStorage.setItem(id, JSON.stringify(this.cart.stocks));
      alert('Produit ajouté au panier !');
    }


  }

  // Récupère le panier du client
  public getCart(id: string): Stock[] {
    return JSON.parse(localStorage.getItem(id));
  }

  // Vérifie si le produit existe dans le panier
  public ifExistInCart(idStock: number, idUser: string): boolean {
    this.cart.stocks = [];
    this.cart.stocks = this.getCart(idUser);
    const index: number = this.cart.stocks.indexOf(this.cart.stocks.find(stock => stock.idStock === idStock));
    if (index !== -1) {
      return true;
    }
    return false;
  }

  // Supprime un produit du panier
  public removeFromCart(idStock: number, id: string): void {
    this.cart.stocks = [];
    this.cart.stocks = this.getCart(id);
    const index: number = this.cart.stocks.indexOf(this.cart.stocks.find(stock => stock.idStock === idStock));
    if (index !== -1) {
      this.cart.stocks.splice(index, 1);
    }
    localStorage.setItem(id, JSON.stringify(this.cart.stocks));
  }

}
