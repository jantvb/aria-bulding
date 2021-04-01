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

  options!: FormGroup;
  firstNameControl!: FormControl;
  lastNameControl!: FormControl;

  user: User = new User();

  title: string = 'Create New User';

  constructor(fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: User) {

    Object.assign(this.user, data);

    if (this.user.id === undefined) {
      this.title = 'Create New User';
    } else {
      this.title = 'Editing: ' + this.user.firstname + ' ' + this.user.lastname;
    }

    this.firstNameControl = new FormControl(this.user.firstname);
    this.lastNameControl  = new FormControl(this.user.lastname);

    this.options = fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
    });

  }

  ngOnInit(): void {
  }

}
