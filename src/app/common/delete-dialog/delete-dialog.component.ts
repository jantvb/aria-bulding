import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  type:     string;
  id!:      number;
  name!:    string;

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
