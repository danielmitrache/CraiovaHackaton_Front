import { Routes } from '@angular/router';
import { CarServicesComponent } from './car-services/car-services.component';
import { MainPageComponent } from './main-page/main-page';
import { LoginPageComponent } from './login-page/login-page';
import { RegisterPageComponent } from './register-page/register-page';
import { AccountComponent } from './account/account';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'services', component: CarServicesComponent },
  { path: 'account', component: AccountComponent },
];
