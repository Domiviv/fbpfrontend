import {Component, OnDestroy, OnInit} from '@angular/core';

import {ItemService} from '../../services/item.service';
import {Subscription} from 'rxjs';
import {Item} from '../../models/Item.model';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {CartService} from '../../services/cart.service';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';
import {StockService} from '../../services/stock.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.scss']
})
export class HomeItemsComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private userService: UserService,
              private stockService: StockService,
              private modalService: NgbModal
  ) {
  }


  isAdmin = false;
  isCustomer = false;
  items: Item[];
  cartItem = new Item();
  idUser: string;
  itemSubscription: Subscription;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  searchText: any;
  closeResult = '';

  open(content): void {
    this.modalService.open(content, {scrollable: true, centered: true, ariaLabelledBy: 'overview-item'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

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

    if (this.tokenStorageService.getUser()) {
      this.userSubscription = this.userService.getUserByEmail(this.tokenStorageService.getUser()).subscribe(
        (user: User) => {
          this.idUser = user.idUser.toString();

          console.log(this.cartService.getCart(this.idUser));
          console.log(this.cartService.ifExistInCart(59, this.idUser));
        }, error => {
          console.log(error);
        }
      );
    }
  }

  onAdd(idItem): void {
    if (this.isCustomer) {
      this.cartSubscription = this.stockService.getStockItemByItemId(idItem).subscribe(
        (stock) => {
          if (stock) {
            this.cartService.addToCart(stock, this.idUser);
            location.reload();
          } else {
            alert('Ce produit n\'est plus en stock');
          }
        }
      );
    } else {
      alert('Veuillez vous inscrire ou vous connecter pour réserver');
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
