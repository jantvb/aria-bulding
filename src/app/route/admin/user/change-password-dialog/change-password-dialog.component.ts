import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  options!:                     FormGroup;
  oldPasswordControl!:          FormControl;
  newPasswordControl!:          FormControl;
  confirmPasswordControl!:      FormControl;

  hide = true;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
                            fb: FormBuilder,
                            @Inject(MAT_DIALOG_DATA) public data: {oldPassword: string, newPassword: string, confirmPassword: string}) {


    this.options = fb.group({
      oldPassword:               this.oldPasswordControl,
      newPasswordControl:        this.newPasswordControl,
      confirmPasswordControl:    this.confirmPasswordControl
    });

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  changePassword(): void {
    this.dialogRef.close();
  }


}
