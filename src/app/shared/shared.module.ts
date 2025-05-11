import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../core/material/material.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    MatConfirmDialogComponent
  ]
})
export class SharedModule { }
