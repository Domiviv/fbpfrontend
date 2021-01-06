import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeItemsComponent} from './components/home-items/home-items.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from './services/item.service';
import {NgpSortModule} from 'ngp-sort-pipe';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {AuthenticationService} from './services/auth/authentication.service';
import {RoleGuardService} from './services/guard/role-guard.service';
import {TokenStorageService} from './services/auth/token-storage.service';
import {LoginComponent} from './components/login/login.component';
import {RoleService} from './services/role.service';
import {UserService} from './services/user.service';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {authInterceptorProviders} from './services/auth/http-interceptor-auth.service';
import {AnonymousGuardService} from './services/guard/anonymous-guard.service';
import {ManageItemsComponent} from './components/dashboard/manage-items/manage-items.component';
import {MeasureService} from './services/measure.service';
import {ManageCustomersComponent} from './components/dashboard/manage-customers/manage-customers.component';
import {CartService} from './services/cart.service';
import {AddItemComponent} from './components/dashboard/add-item/add-item.component';
import {ManageOrdersComponent} from './components/dashboard/manage-orders/manage-orders.component';
import {AllergenService} from './services/allergen.service';
import {EditItemComponent} from './components/dashboard/edit-item/edit-item.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {PurchaseComponent} from './components/purchase/purchase.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FooterComponent} from './components/footer/footer.component';
import {LegalComponent} from './components/legal/legal.component';
import {RgpdComponent} from './components/rgpd/rgpd.component';
import {ConditionsComponent} from './components/conditions/conditions.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {

  cookie: {
    domain: 'http://localhost:4200'
  },
  position: 'bottom',
  theme: 'classic',
  palette: {
    popup: {
      background: '#9C5242',
      text: '#fffbf2',
      link: '#ffffff'
    },
    button: {
      background: '#fffbf2',
      text: '#9C5242',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'Ce site web utilise des cookies pour vous assurer la meilleure expérience de navigation sur notre site.',
    dismiss: 'OK, j\'ai compris!',
    deny: 'Refuser',
    link: 'Plus d\'information',
    href: 'terms-and-conditions',
    policy: 'Cookie Policy',
    header: 'Cookies sur le site!',
    allow: 'Autoriser les cookies'
  }

};

const appRoutes: Routes = [
  {
    path: 'dashboard/edit-item/:id',
    canActivate: [RoleGuardService],
    component: EditItemComponent,
    data: {
      expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },
  {
    path: 'dashboard/items',
    canActivate: [RoleGuardService],
    component: ManageItemsComponent,
    data: {
      expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },
  {
    path: 'dashboard/items/add',
    canActivate: [RoleGuardService],
    component: AddItemComponent,
    data: {
      expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },
  {
    path: 'dashboard/customers',
    canActivate: [RoleGuardService],
    component: ManageCustomersComponent,
    data: {
      expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },

  {
    path: 'dashboard/orders',
    canActivate: [RoleGuardService],
    component: ManageOrdersComponent,
    data: {
      expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },
  {
    path: 'my-orders',
    canActivate: [RoleGuardService],
    component: MyOrdersComponent,
    data: {
      expectedRole: ['ROLE_CLIENT']
    }
  },
  {
    path: 'purchase',
    canActivate: [RoleGuardService],
    component: PurchaseComponent,
    data: {
      expectedRole: ['ROLE_CLIENT']
    }
  },
  {
    path: 'profile',
    canActivate: [RoleGuardService],
    component: ProfileComponent,
    data: {
      expectedRole: ['ROLE_CLIENT']
    }
  },
  {path: 'register', canActivate: [AnonymousGuardService], component: RegisterComponent},
  {path: 'login', canActivate: [AnonymousGuardService], component: LoginComponent},
  {path: 'home', component: HomeItemsComponent},
  {path: 'terms-and-conditions', component: ConditionsComponent},
  {path: 'rgpd', component: RgpdComponent},
  {path: 'legal', component: LegalComponent},
  {path: '', component: HomeItemsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeItemsComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ManageItemsComponent,
    ManageCustomersComponent,
    AddItemComponent,
    ManageOrdersComponent,
    EditItemComponent,
    MyOrdersComponent,
    PurchaseComponent,
    FooterComponent,
    LegalComponent,
    RgpdComponent,
    ConditionsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgpSortModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'}),
    NgbModule,
    Ng2SearchPipeModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    AllergenService,
    AnonymousGuardService,
    AuthGuardService,
    AuthenticationService,
    authInterceptorProviders,
    CartService,
    ItemService,
    MeasureService,
    RoleService,
    RoleGuardService,
    TokenStorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
