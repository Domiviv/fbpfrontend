import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../models/Item.model';
import {Subscription} from 'rxjs';
import {ItemService} from '../../../services/item.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit, OnDestroy {

  items: Item[];
  itemSubscription: Subscription;
  searchText: any;
  closeResult = '';

  constructor(private itemService: ItemService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.itemSubscription = this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
      }, error => {
        console.log(error);
      }
    );
  }

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

  onDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce produit ? \nid du produit : ' + id)) {
      this.itemService.deleteById(id);
      location.reload();
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
  }

}
