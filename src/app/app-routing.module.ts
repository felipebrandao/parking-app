import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'parkings',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },{
    path: 'parkings',
    loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule),
    canActivate: [authGuard]
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
