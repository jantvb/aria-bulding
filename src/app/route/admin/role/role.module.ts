import { RoleComponent } from './role.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [RoleComponent, AddDialogComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class RoleModule { }
