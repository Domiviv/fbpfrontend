import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeItemsComponent } from './components/home-items/home-items.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemService} from './services/item.service';
import { NgpSortModule } from 'ngp-sort-pipe';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { AuthenticationService } from './services/auth/authentication.service';
import { RoleGuardService } from './services/guard/role-guard.service';
import { TokenStorageService } from './services/auth/token-storage.service';
import { LoginComponent } from './components/login/login.component';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './services/auth/http-interceptor-auth.service';
import { AnonymousGuardService } from './services/guard/anonymous-guard.service';
import { ManageItemsComponent } from './components/dashboard/manage-items/manage-items.component';
import { OverviewItemComponent } from './components/overview-item/overview-item.component';
import { MeasureService } from './services/measure.service';
import { ManageCustomersComponent } from './dashboard/manage-customers/manage-customers.component';
import { ManageNewsComponent } from './dashboard/manage-news/manage-news.component';
import { CartService } from './services/cart.service';




const appRoutes: Routes = [
  { path: 'overview/:id', component: OverviewItemComponent},
  {
    path: 'dashboard/items',
    canActivate: [RoleGuardService],
    component: ManageItemsComponent,
    data : {
        expectedRole: ['ROLE_ADMINISTRATEUR']
    }
  },
  { path: 'register', canActivate: [AnonymousGuardService], component: RegisterComponent },
  { path: 'login', canActivate: [AnonymousGuardService], component: LoginComponent },
  { path: 'home', component: HomeItemsComponent },
  { path: '', component: HomeItemsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeItemsComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ManageItemsComponent,
    OverviewItemComponent,
    ManageCustomersComponent,
    ManageNewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgpSortModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
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
export class AppModule { }
