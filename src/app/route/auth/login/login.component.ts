import { AuthService } from './../../../service/authService/auth.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  user!:                  User;

  options!:               FormGroup;
  usernameControl!:       FormControl;
  passwordControl!:       FormControl;


  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.user                = new User();

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
      return 'Please enter your username';
    }

    return this.usernameControl.hasError('emailControl') ? 'Not a valid email' : '';
  }

  login(): void {

    console.log(this.usernameControl);
    console.log(this.user);
    console.log(this.fb);
    debugger;

    this.authService.login(this.user);

  }

}
