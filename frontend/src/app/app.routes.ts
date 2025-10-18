import { Routes } from '@angular/router';
import { CarServicesComponent } from './car-services/car-services.component';
import { MainPageComponent } from './main-page/main-page';
import { LoginPageComponent } from './login-page/login-page';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'services', component: CarServicesComponent },
  { path: 'login', component: LoginPageComponent }
];
