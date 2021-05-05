import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor } from './../../../../model/floor.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                 FormGroup;
  nameControl!:             FormControl;
  typeControl!:             FormControl;

  title:                    string = 'Create New Role';

  floor!:                   Floor;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Floor) {

    this.floor = new Floor();

    Object.assign(this.floor, data);

    if (this.floor.id === undefined) {
      this.title = 'Create New Floor';
    } else {
      this.title = 'Editing: ' + this.floor.name;
    }

    this.nameControl   = new FormControl(this.floor.name);
    this.typeControl   = new FormControl(this.floor.type);

    this.options = fb.group({
      name:       this.nameControl,
      type:       this.typeControl
    });

  }

  ngOnInit(): void {
  }

  typeChange(event: any) {
    this.floor.type = event.value;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.floor);
  }

}
