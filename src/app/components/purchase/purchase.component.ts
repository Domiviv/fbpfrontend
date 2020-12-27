import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/User.model';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {Cart} from '../../models/Cart.model';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  userSubscription: Subscription;
  user: User;
  cart = new Cart();


  constructor(private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()){
      this.userSubscription = this.userService.getUserByEmail(this.tokenStorageService.getUser()).subscribe(
        (user: User) => {
          this.user = user;
          this.cart.stocks = this.cartService.getCart(user.idUser.toString());
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onOrder(): void{
    this.orderService.addOrder(this.user.idUser, this.cart.stocks);
    this.cartService.removeCart(this.user.idUser.toString());
  }

}
