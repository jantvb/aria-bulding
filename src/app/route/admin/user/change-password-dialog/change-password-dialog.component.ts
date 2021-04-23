import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SessionService } from 'src/app/service/authService/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public  dialogRef:      MatDialogRef<ChangePasswordDialogComponent>,
              private userService:    UserService,
              private matSnackBar:    MatSnackBar,
              private sessionService: SessionService,
              public  fb:             FormBuilder) {

    this.oldPasswordControl      = new FormControl();
    this.newPasswordControl      = new FormControl();
    this.confirmPasswordControl  = new FormControl();

    this.options = fb.group({
      oldPasswordControl:        this.oldPasswordControl,
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
    this.userService
        .changePassword(this.sessionService.load().id,
                        this.oldPasswordControl.value,
                        this.newPasswordControl.value)
        .subscribe(r => {
          this.matSnackBar.open('Password Changed', 'Dismiss', {duration: 3000});
          this.dialogRef.close();
        }, err => {
          console.log(err);
          this.matSnackBar.open('Error trying to change Password: ' + err, 'Dismiss', {duration: 3000});
        })
  }

}
