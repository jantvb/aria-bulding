import { MatDialog } from '@angular/material/dialog';
import { FloorService } from './../../../../service/floor.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Floor } from './../../../../model/floor.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-table-floor',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns:                       string[] = ['name', 'type', 'actions'];
  dataSource!:                            MatTableDataSource<Floor>;

  floors:                                 Array<Floor> = new Array<Floor>();

  @ViewChild(MatPaginator) paginator!:    MatPaginator;
  @ViewChild(MatSort) sort!:              MatSort;

  Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })

  constructor(private floorService:       FloorService,
              public  dialog:             MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event): void {
    const filterValue      = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable(): void {

    this.dataSource             = new MatTableDataSource(this.floors);

    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;

  }

  private load(): void {
    this.floorService
        .list()
        .subscribe( rFloors => {

          this.floors = new Array<Floor>();

          Object.assign(this.floors, rFloors);

          this.refreshTable();

        });
  }

  protected delete(floorId: number): void {

    this.floorService
        .delete(floorId)
        .subscribe(() => {

          this.floors
              .splice(this.floors
                          .findIndex(f => f.id === floorId),
                      1);

          this.Toast.fire({
                        icon: 'success',
                        title: 'Floor deleted successfully'
                      })

          this.refreshTable();

        });
  }

  protected createOrUpdate(floor: Floor): void {

    this.floorService
        .createOrUpdate(floor)
        .subscribe(aF => {

          if (floor.id === undefined || floor.id == null) {

            this.floors.unshift(aF);

          } else {

            Object.assign(this.floors.find(f => f.id === floor.id), aF);

          }

          this.Toast.fire({
                            icon: 'success',
                            title: 'Floor saved successfully'
                          })

          this.refreshTable();

        });
  }

  openDialog(floor: Floor): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: floor});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(floor: Floor): void {

      Swal.fire({
                  title: 'Are you sure you want to delete the floor ' + floor.name + '?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.delete(floor.id);
                  }
                })

  }

}