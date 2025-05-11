import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParkingListComponent} from './components/parking-list/parking-list.component';
import {MainLayoutComponent} from '../shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ParkingListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule {}
