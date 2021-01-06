import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/User.model';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {Cart} from '../../models/Cart.model';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  user: User;
  cart = new Cart();
  total = 0;


  constructor(private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()) {
      this.userSubscription = this.userService.getUserByEmail(this.tokenStorageService.getUser()).subscribe(
        (user: User) => {
          this.user = user;
          this.cart.stocks = this.cartService.getCart(user.idUser.toString());
          for (const stock of this.cart.stocks) {
            this.total += stock.item.price;
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onOrder(): void {
    this.orderService.addOrder(this.user.idUser, this.cart.stocks);
    this.cartService.removeCart();
    // tslint:disable-next-line:max-line-length
    alert('Merci pour votre commande. Vous allez recevoir un e-mail dans les prochaines minutes\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
    // this.router.navigate(['home']).then(() => location.reload());
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
