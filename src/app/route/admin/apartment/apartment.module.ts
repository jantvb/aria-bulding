import { MatDialogModule } from '@angular/material/dialog';
import { ApartmentComponent } from './apartment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentRoutingModule } from './apartment-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { TableComponent } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ApartmentComponent, AddDialogComponent, TableComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class ApartmentModule { }
