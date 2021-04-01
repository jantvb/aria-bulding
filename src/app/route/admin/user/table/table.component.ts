import {  Component,
          OnInit,
          ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-table-user',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'status'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: Array<User> = new Array<User>();

  constructor(private userService: UserService,
              public  dialog:      MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {

    this.userService.list().subscribe(uList => {

      this.users = new Array<User>();

      Object.assign(this.users, uList);

      this.refreshTable();

    }, err => {
      console.log(err);
    });

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

          this.refreshTable();

        }, err => console.log(err));
  }

  editOrCreate(user: User): void {

    this.userService
        .createOrUpdate(user)
        .subscribe(uResponse => {

          if (user.id !== undefined) {

            Object.assign(this.users.find(u => u.id === user.id), uResponse);

          } else {

            this.users.unshift(uResponse);

          }

          this.refreshTable();

        }, err => console.log(err));

  }


  openDialog(user: User): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: user});

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
