import {  Component,
          OnInit,
          ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Document } from 'src/app/model/document.model';
import { DocumentService } from 'src/app/service/document.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-table-document',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {

  displayedColumns:   string[] = ['id', 'name', 'path', 'created', 'updated'];
  dataSource!:         MatTableDataSource<Document>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  documents: Array<Document> = new Array<Document>();

  constructor(private documentService:  DocumentService,
              public  dialog:           MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {

    this.documentService.list().subscribe(uList => {

      this.documents = new Array<Document>();

      Object.assign(this.documents, uList);

      this.refreshTable();

    }, err => {
        console.log(err);
    });

  }

  private refreshTable(): void {

    this.dataSource = new MatTableDataSource(this.documents);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

  }

  protected delete(documentId: number): void {
    this.documentService
        .delete(documentId)
        .subscribe(() => {

          this.documents
              .splice(this.documents
                          .findIndex(u => u.id === documentId),
                      1);

          this.refreshTable();

        }, err => console.log(err));
  }

  editOrCreate(document: Document): void {

    this.documentService
        .createOrUpdate(document)
        .subscribe(uResponse => {

          if (document.id !== undefined) {

            Object.assign(this.documents.find(u => u.id === document.id), uResponse);

          } else {

            this.documents.unshift(uResponse);

          }

          this.refreshTable();

        }, err => console.log(err));

  }

  openDialog(document: Document): void {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: document});

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

