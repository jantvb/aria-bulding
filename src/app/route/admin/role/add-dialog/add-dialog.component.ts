import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/model/role.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:     FormGroup;
  roleControl!: FormControl;

  role:         Role = new Role();

  title:        string = 'Create New Role';

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Role) {

    Object.assign(this.role, data);

    if (this.role.id === undefined) {
      this.title = 'Create New Role';
    } else {
        this.title = 'Editing: ' + this.role.role;
    }

    this.roleControl    = new FormControl(this.role.role);

    this.options = fb.group({
      role:     this.roleControl
    });

  }

  ngOnInit(): void {
  }

}
