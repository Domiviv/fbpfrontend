import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data.expectedRole;
    if (this.tokenStorage.getUser()) {
      if (expectedRole.indexOf(this.tokenStorage.getRole()) > -1) {
        return true;
      } else {
        this.router.navigate(['not-found']);
      }
    } else {
      this.router.navigate(['not-found']);
    }
  }
}
