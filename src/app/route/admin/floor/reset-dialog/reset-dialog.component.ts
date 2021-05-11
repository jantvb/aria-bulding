import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from './../../../../service/authService/session.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Building } from 'src/app/model/building.model';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent implements OnInit {

  options!:                   FormGroup;
  numberOfFloorsControl!:     FormControl;

  currentBuilding:            Building = new Building();



  constructor(public dialogRef:                     MatDialogRef<ResetDialogComponent>,
              private sessionService:               SessionService,
                                  fb:               FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: number) {

    this.currentBuilding          = sessionService.loadCurrentBuilding();

    this.numberOfFloorsControl    = new FormControl();

    this.options = fb.group({
      numberOfFloors:         this.numberOfFloorsControl
    });

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.data);
  }

}
