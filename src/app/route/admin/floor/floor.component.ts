import { Building } from './../../../model/building.model';
import { SessionService } from './../../../service/authService/session.service';
import { Floor } from 'src/app/model/floor.model';
import { TableComponent } from './../floor/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  currentBuilding:                   Building = new Building();

  @ViewChild(TableComponent) table!: TableComponent;

  constructor(private sessionService:      SessionService) {
    this.currentBuilding = sessionService.loadCurrentBuilding();
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.table.openDialog(new Floor());
  }

}
