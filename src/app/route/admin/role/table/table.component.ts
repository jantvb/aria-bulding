import {  Component,
          OnInit,
          ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/service/role.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-table-role',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:   string[] = ['id', 'role'];
  dataSource!:        MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  roles: Array<Role> = new Array<Role>();

  constructor(private roleService: RoleService,
              public  dialog:      MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {

    this.roleService.list().subscribe(uList => {

      this.roles = new Array<Role>();

      Object.assign(this.roles, uList);

      this.refreshTable();

    }, err => {
        console.log(err);
    });

  }

  private refreshTable(): void {

    this.dataSource = new MatTableDataSource(this.roles);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

  }

  protected delete(roleId: number): void {
    this.roleService
        .delete(roleId)
        .subscribe(() => {

          this.roles
              .splice(this.roles
                          .findIndex(u => u.id === roleId),
                      1);

          this.refreshTable();

        }, err => console.log(err));
  }

  editOrCreate(role: Role): void {

    this.roleService
        .createOrUpdate(role)
        .subscribe(uResponse => {

          if (role.id !== undefined) {

            Object.assign(this.roles.find(u => u.id === role.id), uResponse);

          } else {

            this.roles.unshift(uResponse);

          }

          this.refreshTable();

        }, err => console.log(err));

  }

  openDialog(role: Role): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: role});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
