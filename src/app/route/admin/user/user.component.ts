import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(TableComponent) table!: TableComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.table.openDialog(new User());
  }

}
