import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../models/Item.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.scss']
})
export class OverviewItemComponent implements OnInit, OnDestroy {

  item: Item;
  itemSub: Subscription;
  routeSub: Subscription;
  id: number;
  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.itemSub = this.itemService.getItemById(this.id).subscribe(
      (item: Item) => {
        this.item = item;
        console.log(this.item);
        if (!this.item){
          this.router.navigate(['not-found']);
        }
      }, error => {
        console.log(error);
      }
    );


  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.itemSub.unsubscribe();
  }

}
