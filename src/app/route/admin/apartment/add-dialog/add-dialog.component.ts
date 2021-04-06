import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apartment } from 'src/app/model/apartment.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                   FormGroup;
  displayControl!:            FormControl;
  descriptionControl!:        FormControl;

  title:                      string = 'Create New Apartment';

  apartment!:                 Apartment;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Apartment) {

    this.apartment = new Apartment();

    Object.assign(this.apartment, data);

    if (this.apartment.id === undefined) {
      this.title = 'Create New Apartment';
    } else {
      this.title = 'Editing: ' + this.apartment.display;
    }

    this.displayControl     = new FormControl(this.apartment.display);
    this.descriptionControl = new FormControl(this.apartment.description);

    this.options = fb.group({
      display:        this.displayControl,
      description:    this.descriptionControl
    });

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.apartment);
  }

}
