import { Injectable } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardService implements CanActivate {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['home']);
    } else {
      return true;
    }
  }
}
