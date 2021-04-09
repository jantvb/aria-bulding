import { TableComponent } from './../user/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Document } from 'src/app/model/document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Document());
  }

}
