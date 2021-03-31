import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user.component';
import { TableComponent } from './table/table.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@NgModule({
  declarations: [UserComponent, AddDialogComponent, TableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatSort
  ]
})
export class UserModule { }
