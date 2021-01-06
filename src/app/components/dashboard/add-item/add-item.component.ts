import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Item} from '../../../models/Item.model';
import {ItemService} from '../../../services/item.service';
import {Measure} from '../../../models/Measure.model';
import {MeasureService} from '../../../services/measure.service';
import {Allergen} from '../../../models/Allergen.model';
import {AllergenService} from '../../../services/allergen.service';
import {ItemContains} from '../../../models/ItemContains.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {

  addItemForm: FormGroup;
  newItem = new Item();
  submitted = false;
  itemSubscription: Subscription;
  measureSubscription: Subscription;
  allergenSubscription: Subscription;
  measures: Measure[];
  allergens: Allergen[];
  iC = new ItemContains();
  item = new Item();

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private measureService: MeasureService,
              private allergenService: AllergenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.measureSubscription = this.measureService.getAllMeasures().subscribe(
      (measures: Measure[]) => {
        this.measures = measures;
      }, error => {
        console.log(error);
      }
    );

    this.allergenSubscription = this.allergenService.getAllAllergens().subscribe(
      (allergens: Allergen[]) => {
        this.allergens = allergens;
      }, error => {
        console.log(error);
      }
    );
  }

  initForm(): void {
    this.addItemForm = this.formBuilder.group({
      label: ['', Validators.required],
      price: [null],
      descr: [null],
      qt: [null],
      measure: [null, Validators.required],
      allergens: new FormArray([]),
      image: [null]
    });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.addItemForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addItemForm.invalid) {
      return;
    }
    this.newItem.label = this.addItemForm.value.label;
    this.newItem.price = this.addItemForm.value.price;
    this.newItem.descr = this.addItemForm.value.descr;
    this.newItem.qt = this.addItemForm.value.qt;
    this.newItem.measure = this.addItemForm.value.measure;
    this.newItem.allergens = this.addItemForm.value.allergens;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newItem, null, 4));
    console.log(this.addItemForm.value.allergens);

    this.itemSubscription = this.itemService.addItem(this.newItem).subscribe(
      () => {
        // tslint:disable-next-line:max-line-length
        alert('Félicitation, un nouveau produit a été ajouté.\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
        this.router.navigate(['dashboard/items']);
      }
    );
  }

  onCheckChange(allergen): void {
    const index: number = this.addItemForm.value.allergens.indexOf(
      this.addItemForm.value.allergens.find(a => a.idAllergen === allergen.idAllergen
      ));
    if (index !== -1) {
      this.addItemForm.value.allergens.splice(index, 1);
    } else {
      this.addItemForm.value.allergens.push(allergen);
    }
    console.log(this.addItemForm.value.allergens);
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.measureSubscription) {
      this.measureSubscription.unsubscribe();
    }
    if (this.allergenSubscription) {
      this.allergenSubscription.unsubscribe();
    }
  }

}
