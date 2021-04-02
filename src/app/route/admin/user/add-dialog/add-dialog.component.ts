import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  options!: FormGroup;
  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  phoneControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  roleControl!: FormControl;

  user: User = new User();

  title: string = 'Create New User';

  roles = this.user.roles;

  hide = true;

  constructor(fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: User) {

    Object.assign(this.user, data);

    if (this.user.id === undefined) {
      this.title = 'Create New User';
    } else {
      this.title = 'Editing: ' + this.user.firstname + ' ' + this.user.lastname;
    }

    this.firstNameControl    = new FormControl(this.user.firstname);
    this.lastNameControl     = new FormControl(this.user.lastname);
    this.phoneControl        = new FormControl(this.user.phoneNumber);
    this.emailControl        = new FormControl(this.user.email);
    this.passwordControl     = new FormControl(this.user.password);
    this.roleControl         = new FormControl(this.user.roles);

    this.options = fb.group({
      firstName:     this.firstNameControl,
      lastName:      this.lastNameControl,
      phone:         this.phoneControl,
      email:         this.emailControl,
      password:      this.passwordControl,
      role:          this.roleControl
    });

  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Please enter an email';
    }

    return this.emailControl.hasError('emailControl') ? 'Not a valid email' : '';
  }


  ngOnInit(): void {
  }

}
