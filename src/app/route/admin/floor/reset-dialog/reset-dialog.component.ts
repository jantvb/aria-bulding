import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from './../../../../service/authService/session.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Building } from 'src/app/model/building.model';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent {

  options!:                   FormGroup;
  numberOfFloorsControl!:     FormControl;
  floor13Control!:            FormControl;

  currentBuilding:            Building = new Building();


  constructor(public  dialogRef:                    MatDialogRef<ResetDialogComponent>,
              private sessionService:               SessionService,
                      fb:                           FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {numberOfFloor: number, floor13: boolean}) {
    this.currentBuilding          = sessionService.loadCurrentBuilding();

    this.numberOfFloorsControl    = new FormControl();
    this.floor13Control           = new FormControl();

    this.options = fb.group({
      numberOfFloors:         this.numberOfFloorsControl,
      floor13:                this.floor13Control
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.data.numberOfFloor = this.numberOfFloorsControl.value;
    this.data.floor13       = this.floor13Control.value;
    this.dialogRef.close(this.data);
  }

}
