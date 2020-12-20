import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  itemContainsSubscription: Subscription;
  measureSubscription: Subscription;
  allergenSubscription: Subscription;
  measures: Measure[];
  allergens: Allergen[];
  allergensList: Allergen[];
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
      allergens: new FormArray([])
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
    this.allergensList = this.addItemForm.value.allergens;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newItem, null, 4));
    console.log(this.allergensList);

    this.itemSubscription = this.itemService.newItem(this.newItem).subscribe(
      () => {
        // tslint:disable-next-line:max-line-length
        alert('Félicitation, un nouveau produit a été ajouté.\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
        this.router.navigate(['dashboard/items']);
      }
    );

    // this.itemSubscription = this.itemService.newItem(this.newItem).subscribe(
    //   (item: Item) => {
    //     this.item = item;
    //     console.log('test : ' + item.idItem);
    //     // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //     alert('Félicitation, un nouveau produit a été ajouté.\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
    //     // this.router.navigate(['login']);
    //   }
    // );

    // // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.allergensList.length; i++) {
    //   this.iC.idAllergen = Number(this.allergensList[i]);
    //   this.iC.idItem = this.newItem.idItem;
    //
    //   alert(JSON.stringify(this.iC, null, 4));
    //   this.itemContainsSubscription = this.itemService.newItemContains(this.iC).subscribe(
    //     () => {
    //       // tslint:disable-next-line:max-line-length
    //       alert('Félicitation, les allergenes ajouté.\n\nVous serez redirigé vers la liste des produits après avoir cliqué sur "Ok"');
    //       // this.router.navigate(['login']);
    //     }
    //   );
    // }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    this.measureSubscription.unsubscribe();
    this.allergenSubscription.unsubscribe();
    // this.itemContainsSubscription.unsubscribe();
  }

  onCheckChange(event): void {
    const formArray: FormArray = this.addItemForm.get('allergens') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        // tslint:disable-next-line:triple-equals
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
}
