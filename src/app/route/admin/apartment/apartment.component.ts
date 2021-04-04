import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from './table/table.component';
import { Apartment } from 'src/app/model/apartment.model';


@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.table.openDialog(new Apartment());
  }

}
