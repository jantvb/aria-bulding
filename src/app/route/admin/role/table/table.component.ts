import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/service/role.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-table-role',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {


  displayedColumns:                         string[] = ['role', 'actions'];
  dataSource!:                              MatTableDataSource<Role>;

  roles:                                    Array<Role> = new Array<Role>();

  @ViewChild(MatPaginator) paginator!:      MatPaginator;
  @ViewChild(MatSort) sort!:                MatSort;

  constructor(private roleService:        RoleService,
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

    this.dataSource             = new MatTableDataSource(this.roles);

    this.dataSource.paginator   = this.paginator;
    this.dataSource.sort        = this.sort;

  }

  private load(): void {
    this.roleService
        .list()
        .subscribe( rRoles => {

          this.roles = new Array<Role>();

          Object.assign(this.roles, rRoles);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected delete(roleId: number): void {

    this.roleService
        .delete(roleId)
        .subscribe(() => {

          this.roles
              .splice(this.roles
                          .findIndex(b => b.id === roleId),
                      1);

          this.refreshTable();

        }, err => console.log(err));
  }

  protected createOrUpdate(role: Role): void {

    this.roleService
        .createOrUpdate(role)
        .subscribe(aR => {

          if (role.id === undefined || role.id == null) {

            this.roles.unshift(aR);

          } else {

            Object.assign(this.roles.find(r => r.id === role.id), aR);

          }

          this.refreshTable();

        }, err => console.log(err));
  }

  openDialog(role: Role): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {data: role});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createOrUpdate(result);
      }

    });
  }

  openDeleteDialog(roleId: number, roleName: string, type: string): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {roleId, roleName, type}});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.delete(result);
      }

    });
  }

}
