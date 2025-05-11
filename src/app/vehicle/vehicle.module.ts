import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleRoutingModule} from './vehicle-routing.module';
import {VehicleListComponent} from './components/vehicle-list/vehicle-list.component';
import {MaterialModule} from '../core/material/material.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {VehicleFormDialogComponent} from './components/vehicle-form-dialog/vehicle-form-dialog.component';


@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleFormDialogComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    VehicleListComponent,
    VehicleFormDialogComponent
  ]
})
export class VehicleModule { }
