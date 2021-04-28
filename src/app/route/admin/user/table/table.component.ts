import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { BuildingService } from 'src/app/service/building.service';
import { Observable } from 'rxjs';
import { Building } from 'src/app/model/building.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-user',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:                     string[] = ['name', 'username', 'phone', 'defaultBuilding', 'status', 'actions'];
  dataSource!:                          MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!:            MatSort;

  users:                                Array<User> = new Array<User>();

  buildings: Array<Building> = new Array<Building>();

  constructor(private userService: UserService,
              private buildingService: BuildingService,
              public  dialog:      MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {

    this.userService
        .list()
        .subscribe( rUser => {

          this.users = new Array<User>();

          Object.assign(this.users, rUser);

          this.refreshTable();

        }, err => console.log(err));

  }

  private refreshTable(): void {

    this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

  }

  protected delete(userId: number): void {
    this.userService
        .delete(userId)
        .subscribe(() => {

          this.users
              .splice(this.users
                         .findIndex(u => u.id === userId),
                      1);

          Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User deleted successfully',
                        showConfirmButton: true,
                        timer: 3000
                    })

          this.refreshTable();

        }, err => console.log(err));
  }

  protected createOrUpdate(user: User): void {

    this.userService
        .createOrUpdate(user)
        .subscribe(aU => {

          if (user.id === undefined || user.id == null) {

            this.users.unshift(aU);

          } else {

            Object.assign(this.users.find(u => u.id === user.id), aU);

          }

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User saved successfully',
            showConfirmButton: true,
            timer: 3000
        })

          this.refreshTable();

        }, err => console.log(err));

  }


  openDialog(user: User): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: user});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(user: User): void {

    Swal.fire({
                title: 'Are you sure you want to delete the user ' + user.username + '?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.delete(user.id);
                }
              })
  }

  changeEnable(user: User): void {
    user.enabled = !user.enabled;

    this.createOrUpdate(user);
  }

  findBuilding(buildingId: number): string {

    if (buildingId) {
      if (this.buildings.some(b => b.id === buildingId)) {
        return this.buildings.filter(b => b.id === buildingId)[0].name;
      } else {
        this.buildingService
            .get(buildingId)
            .subscribe(b => {
              if (!this.buildings.some(b => b.id === buildingId)) {
                this.buildings.push(b);
              }
            });
        return 'No Yet';
      }
    } else {
      return 'No Default Building';
    }

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
