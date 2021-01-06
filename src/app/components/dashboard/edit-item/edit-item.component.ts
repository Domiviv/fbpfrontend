import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../../models/Item.model';
import {ItemService} from '../../../services/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Measure} from '../../../models/Measure.model';
import {Allergen} from '../../../models/Allergen.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemContains} from '../../../models/ItemContains.model';
import {MeasureService} from '../../../services/measure.service';
import {AllergenService} from '../../../services/allergen.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {

  item: Item;
  measures: Measure[];
  allergens: Allergen[];
  iC = new ItemContains();
  newItem = new Item();

  id: number;
  submitted = false;

  routeSubscription: Subscription;
  itemSubscription: Subscription;
  measureSubscription: Subscription;

  editItemForm: FormGroup;

  constructor(private itemService: ItemService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private measureService: MeasureService,
              private allergenService: AllergenService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.itemSubscription = this.itemService.getItemById(this.id).subscribe(
      (item: Item) => {
        this.item = item;
        this.initForm();
      }, error => {
        console.log(error);
      }
    );
    this.measureSubscription = this.measureService.getAllMeasures().subscribe(
      (measures: Measure[]) => {
        this.measures = measures;
      }, error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.editItemForm.invalid) {
      return;
    }
    this.newItem.allergens = this.item.allergens;
    this.newItem.idItem = this.item.idItem;
    this.newItem.label = this.editItemForm.value.label;
    this.newItem.price = this.editItemForm.value.price;
    this.newItem.descr = this.editItemForm.value.descr;
    this.newItem.qt = this.editItemForm.value.qt;
    this.newItem.measure = this.editItemForm.value.measure;

    this.itemSubscription = this.itemService.updateItemById(this.newItem).subscribe(
      () => {
        // tslint:disable-next-line:max-line-length
        alert('Félicitation, le produit a été modifié.\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
        this.router.navigate(['dashboard/items']);
      }
    );

  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.editItemForm.controls;
  }

  initForm(): void {
    this.editItemForm = this.formBuilder.group({
      label: [this.item.label, Validators.required],
      price: [this.item.price],
      descr: [this.item.descr],
      qt: [this.item.qt],
      measure: [this.item.measure, Validators.required],
      allergens: [this.item.allergens]
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.measureSubscription) {
      this.measureSubscription.unsubscribe();
    }
  }

}
