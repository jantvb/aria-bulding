import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Building } from 'src/app/model/building.model';
import { BuildingService } from 'src/app/service/building.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-building',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {


  displayedColumns:                         string[] = ['name', 'description', 'actions'];
  dataSource!:                              MatTableDataSource<Building>;

  buildings:                               Array<Building> = new Array<Building>();

  @ViewChild(MatPaginator) paginator!:      MatPaginator;
  @ViewChild(MatSort) sort!:                MatSort;

  constructor(private buildingService:    BuildingService,
              public  dialog:             MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable(): void {

    this.dataSource             = new MatTableDataSource(this.buildings);

    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;

  }

  private load(): void {
    this.buildingService
        .list()
        .subscribe( rBuildings => {

          this.buildings = new Array<Building>();

          Object.assign(this.buildings, rBuildings);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected delete(buildingId: number): void {

    this.buildingService
        .delete(buildingId)
        .subscribe(() => {

          this.buildings
              .splice(this.buildings
                          .findIndex(b => b.id === buildingId),
                      1);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected createOrUpdate(building: Building): void {

    this.buildingService
        .createOrUpdate(building)
        .subscribe(aB => {

          if (building.id === undefined || building.id == null) {

            this.buildings.unshift(aB);

          } else {

            Object.assign(this.buildings.find(b => b.id === building.id), aB);

          }

          this.refreshTable();

        }, err => console.log(err));
  }

  openDialog(building: Building): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: building});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

}
