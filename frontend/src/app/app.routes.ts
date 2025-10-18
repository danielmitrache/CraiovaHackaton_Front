import { Routes } from '@angular/router';
import { CarServicesComponent } from './car-services/car-services.component';
import { MainPageComponent } from './main-page/main-page';
import { LoginPageComponent } from './login-page/login-page';
import { CreateAccountComponent } from './create-account/create-account';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: CreateAccountComponent },
  { path: 'services', component: CarServicesComponent }
];
