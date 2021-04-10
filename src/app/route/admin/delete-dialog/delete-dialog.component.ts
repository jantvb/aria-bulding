import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { Apartment } from 'src/app/model/apartment.model';
import { Building } from 'src/app/model/building.model';
import { Document } from 'src/app/model/document.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  type: string;
  id!:  number;
  name!: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                    @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string, type: string}) {

    this.type = data.type;
    this.id   = data.id;
    this.name = data.name;

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.id);
  }

}
