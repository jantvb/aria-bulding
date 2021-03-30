import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [UserComponent, AddDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class UserModule { }
