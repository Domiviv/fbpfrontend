import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/auth/token-storage.service';
import {Router} from '@angular/router';
import {CartService} from './services/cart.service';
import {Cart} from './models/Cart.model';
import {Subscription} from 'rxjs';
import {UserService} from './services/user.service';
import {User} from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isCustomer = false;
  user: User;
  cart = new Cart();
  userSubscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService,
              private userService: UserService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isAdmin = this.tokenStorageService.getRole() === 'ROLE_ADMINISTRATEUR';
    this.isCustomer = this.tokenStorageService.getRole() === 'ROLE_CLIENT';

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
    else{
      this.cart.stocks = this.cartService.getCart('unknown');
    }

  }
  signOut(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['home']).then(() => location.reload());
  }

  onRemove(idStock): void{
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce produit du panier?')){
      this.cartService.removeFromCart(idStock, this.user.idUser.toString());
      location.reload();
    }
  }

  onOrder(): void{
    this.router.navigate(['/purchase']);
  }

}
