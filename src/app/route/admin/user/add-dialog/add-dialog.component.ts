import { RoleService } from './../../../../service/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  maskPhone           = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskSocialSecurity  = [ /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  options!:                     FormGroup;
  firstNameControl!:            FormControl;
  lastNameControl!:             FormControl;
  phoneControl!:                FormControl;
  socialSecurityControl!:       FormControl;
  usernameControl!:             FormControl;
  passwordControl!:             FormControl;
  roleControl!:                 FormControl;

  user:                         User = new User();

  title:                        string = 'Create New User';

  roles:                        Array<Role> = new Array<Role>();

  hide = true;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
                    fb: FormBuilder,
                    @Inject(MAT_DIALOG_DATA) public data: User,
                    private roleService: RoleService) {

    this.roleService
                    .list()
                    .subscribe( rRoles => {
                    this.roles = new Array<Role>();
                    Object.assign(this.roles, rRoles);
    })

    Object.assign(this.user, data);

    if (this.user.id === undefined) {
      this.title = 'Create New User';
    } else {
      this.title = 'Editing: ' + this.user.firstname + ' ' + this.user.lastname;
    }

    this.firstNameControl             = new FormControl(this.user.firstname);
    this.lastNameControl              = new FormControl(this.user.lastname);
    this.phoneControl                 = new FormControl(this.user.phoneNumber);
    this.socialSecurityControl        = new FormControl(this.user.socialSecurity);
    this.usernameControl              = new FormControl(this.user.username, [Validators.required,
                                                                             Validators.email,]);
    this.passwordControl              = new FormControl(this.user.password);
    this.roleControl                  = new FormControl(this.user.roles);

    this.options = fb.group({
      firstName:              this.firstNameControl,
      lastName:               this.lastNameControl,
      phone:                  this.phoneControl,
      socialSecurity:         this.socialSecurityControl,
      username:               this.usernameControl,
      password:               this.passwordControl,
      role:                   this.roleControl
    });

  }


  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.user);
  }


}
