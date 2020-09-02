import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isCustomer = false;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isAdmin = this.tokenStorageService.getRole() === 'ROLE_ADMINISTRATEUR';
    this.isCustomer = this.tokenStorageService.getRole() === 'ROLE_CLIENT';
  }
  signOut(): void {
    this.tokenStorageService.signOut();
    location.reload();
    this.router.navigate(['home']);
  }
}
