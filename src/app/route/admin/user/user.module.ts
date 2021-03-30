import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule
  ]
})
export class UserModule { }
