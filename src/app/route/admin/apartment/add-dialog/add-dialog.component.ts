import { BuildingService } from './../../../../service/building.service';
import { Building } from 'src/app/model/building.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apartment } from 'src/app/model/apartment.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                   FormGroup;
  displayControl!:            FormControl;
  descriptionControl!:        FormControl;
  buildingControl!:           FormControl;

  title:                      string = 'Create New Apartment';

  apartment:                  Apartment = new Apartment();

  buildings:                  Array<Building> = new Array<Building>();

  constructor(public dialogRef:         MatDialogRef<AddDialogComponent>,
              private buildingService:  BuildingService,
              fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Apartment) {



    Object.assign(this.apartment, data);

    if (this.apartment.id === undefined) {
      this.title = 'Create New Apartment';
    } else {
      this.title = 'Editing: ' + this.apartment.display;
    }

    this.displayControl     = new FormControl(this.apartment.display, [Validators.required]);
    this.descriptionControl = new FormControl(this.apartment.description);
    this.buildingControl    = new FormControl(this.apartment.building, [Validators.required]);

    this.options = fb.group({
      display:        this.displayControl,
      description:    this.descriptionControl,
      building:       this.buildingControl
    });

  }

  ngOnInit(): void {
    this.loadBuildings();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.apartment);
  }

  buildingChanged(event: any): void {
    this.apartment.building = new Building();
    this.apartment.building.id = event.value;
  }

  loadBuildings(): void {
    this.buildingService
        .list()
        .subscribe(b => this.buildings = b,
                   err => console.log(err));
  }

}
