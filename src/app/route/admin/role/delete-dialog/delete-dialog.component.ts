import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title:      string = 'Delete Role';

  role!:       Role;


  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {

    this.role = new Role();
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.role.id);
  }

}
