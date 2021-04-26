import { RoleService } from './../../../../service/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { Role } from 'src/app/model/role.model';
import { Observable } from 'rxjs';
import { Building } from 'src/app/model/building.model';
import { BuildingService } from 'src/app/service/building.service';

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
  defaultBuildingControl!:      FormControl;

  buildings?: Array<Building> = new Array();

  user:                         User = new User();

  title:                        string = 'Create New User';

  roles:                        Array<Role> = new Array<Role>();

  hide = true;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
                    fb: FormBuilder,
                    @Inject(MAT_DIALOG_DATA) public data: User,
                    private buildingService:  BuildingService,
                    private roleService:      RoleService) {

    this.roleService
        .list()
        .subscribe( rRoles => {
        this.roles = new Array<Role>();
          Object.assign(this.roles, rRoles);
        });

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
    this.usernameControl              = new FormControl(this.user.username);
    this.passwordControl              = new FormControl(this.user.password);
    this.roleControl                  = new FormControl(this.user.roles);
    this.defaultBuildingControl       = new FormControl(this.user.defaultBuilding);

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
    this.loadBuildings();
  }

  loadBuildings(): void {
    this.buildingService
        .list()
        .subscribe(b => this.buildings = b,
                   err => console.log(err));
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.user);
  }

  getErrorMessage(): string {
    if (this.usernameControl.hasError('required')) {
      return 'Please enter an email';
    }

    return this.usernameControl.hasError('emailControl') ? 'Not a valid email' : '';
  }

  buildingChanged(event: any): void {
    this.user.defaultBuilding = event.value;
  }

}
