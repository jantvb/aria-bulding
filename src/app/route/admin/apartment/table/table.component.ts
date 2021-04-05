import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Apartment } from 'src/app/model/apartment.model';
import { ApartmentService } from 'src/app/service/apartment.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-apartment',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:                         string[] = ['display', 'description', 'building', 'actions'];
  dataSource!:                              MatTableDataSource<Apartment>;

  apartments:                               Array<Apartment> = new Array<Apartment>();

  @ViewChild(MatPaginator) paginator!:      MatPaginator;
  @ViewChild(MatSort) sort!:                MatSort;

  constructor(private apartmentService:    ApartmentService,
              public  dialog:              MatDialog) {}

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

    this.dataSource = new MatTableDataSource(this.apartments);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  private load(): void {
    this.apartmentService
        .list()
        .subscribe( rApartments => {

          this.apartments = new Array<Apartment>();

          Object.assign(this.apartments, rApartments);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected delete(apartmentId: number): void {

    this.apartmentService
        .delete(apartmentId)
        .subscribe(() => {

          this.apartments
              .splice(this.apartments
                          .findIndex(a => a.id === apartmentId),
                      1);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected createOrUpdate(apartment: Apartment): void {

    this.apartmentService
        .createOrUpdate(apartment)
        .subscribe(aR => {

          if (apartment.id === undefined || apartment.id == null) {

            this.apartments.unshift(aR);

          } else {

            Object.assign(this.apartments.find(a => a.id === apartment.id), aR);

          }

          this.refreshTable();

        }, err => console.log(err));
  }

  openDialog(apartment: Apartment): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: apartment});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
