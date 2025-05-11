import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingListComponent } from './components/parking-list/parking-list.component';
import {MaterialModule} from '../core/material/material.module';
import {ParkingRoutingModule} from './parking-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    ParkingListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ParkingRoutingModule,
  ],
  exports: [
    ParkingListComponent
  ]
})
export class ParkingModule { }
