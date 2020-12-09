import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/auth/token-storage.service';
import {Router} from '@angular/router';
import {CartService} from './services/cart.service';
import {Cart} from './models/Cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isCustomer = false;
  cart = new Cart();

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isAdmin = this.tokenStorageService.getRole() === 'ROLE_ADMINISTRATEUR';
    this.isCustomer = this.tokenStorageService.getRole() === 'ROLE_CLIENT';
    this.cart.items = this.cartService.getCart();
  }
  signOut(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['home']).then(() => location.reload());
  }

  onRemove(idItem): void{
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce produit du panier?')){
      this.cartService.removeFromCart(idItem);
      location.reload();
    }
  }

  onOrder(): void{
    this.router.navigate(['/not-found']);
  }

}
