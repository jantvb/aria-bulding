import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../../model/user.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide    = true;

  user!:                  User;

  options!:               FormGroup;
  usernameControl!:       FormControl;
  passwordControl!:       FormControl;


  constructor(fb: FormBuilder) {

    this.user = new User();

    this.usernameControl     = new FormControl(this.user.username);
    this.passwordControl     = new FormControl(this.user.password);

    this.options = fb.group({
      username:               this.usernameControl,
      password:               this.passwordControl
    });

  }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.usernameControl.hasError('required')) {
      return 'Please enter an email';
    }

    return this.usernameControl.hasError('emailControl') ? 'Not a valid email' : '';
  }

}
