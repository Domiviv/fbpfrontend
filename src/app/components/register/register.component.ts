import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User.model';
import {MustMatch} from '../../../_helpers/must-match.validator';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  newUser = new User();
  submitted = false;
  pwdMinLength = 4;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.minLength(this.pwdMinLength)]],
      pwdconf: ['', Validators.required]
    }, {
      validator: MustMatch('pwd', 'pwdconf')
    });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.newUser.lastName = this.registerForm.value.lastname;
    this.newUser.firstName = this.registerForm.value.firstname;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.address = this.registerForm.value.address + ', ' + this.registerForm.value.number;
    this.newUser.address2 = this.registerForm.value.postcode + ', ' + this.registerForm.value.city;
    this.newUser.pwd = this.registerForm.value.pwd;

    this.userSubscription = this.userService.newCustomer(this.newUser).subscribe(
      () => {
        alert('Félicitation, votre compte a été créé.\n\nVous serez redirigé vers la page de connexion après avoir cliqué sur "Ok"');
        this.router.navigate(['login']);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
