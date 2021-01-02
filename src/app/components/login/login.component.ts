import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {Subscription} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  isLoginFailed = false;
  loginSubscription: Subscription;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.loginSubscription = this.authenticationService.login(this.loginForm).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        if (data) {
          const decodedToken = jwt_decode(data.token);
          this.tokenStorageService.saveUser(decodedToken.sub);
          this.tokenStorageService.saveRole(decodedToken.role);
          this.router.navigate(['home']).then(() => location.reload());
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error => {
        this.errorMessage = error.error = 'adresse email et/ou mot de passe invalide';
        this.isLoginFailed = true;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
