import { Floor } from 'src/app/model/floor.model';
import { TableComponent } from './../floor/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Floor());
  }

}
