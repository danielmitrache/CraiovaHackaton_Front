import { Routes } from '@angular/router';
import { CarServicesComponent } from './car-services/car-services.component';

export const routes: Routes = [
  { path: '', redirectTo: '/services', pathMatch: 'full' },
  { path: 'services', component: CarServicesComponent }
];
