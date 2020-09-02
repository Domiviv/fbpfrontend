import {Component, OnDestroy, OnInit} from '@angular/core';

import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/Item.model';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.scss']
})
export class HomeItemsComponent implements OnInit, OnDestroy {

  isAdmin = false;
  items: Item[];
  itemSubscription: Subscription;

  constructor(private itemService: ItemService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorageService.getRole() === 'ROLE_ADMINISTRATEUR';

    this.itemSubscription = this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
        console.log(items);
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }
}
