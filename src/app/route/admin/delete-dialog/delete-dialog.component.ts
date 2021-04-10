import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title:      string = 'Delete ';
  text:       string = 'Are you sure you want to delete ';

  id:     number;
  name:   string;
  type:   string;


  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                    @Inject(MAT_DIALOG_DATA) public data: {idData: number, nameData: string, typeData: string}) {

    this.id       = data.idData;
    this.name     = data.nameData;
    this.type     = data.typeData;

    if(this.type === 'role') {
      this.title = this.title + 'role';
      this.text  = this.text + 'the role ' + this.name;
    }
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
