import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../models/Item.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit, OnDestroy {

  items: Item[];
  itemSubscription: Subscription;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemSubscription = this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
      }, error => {
        console.log(error);
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce produit ? \nid du produit : ' + id)){
      this.itemService.deleteById(id);
      location.reload();
    }
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

}
