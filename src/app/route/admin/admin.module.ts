import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApartmentComponent } from './apartment/apartment.component';
import { BuildingComponent } from './building/building.component';
import { DocumentComponent } from './document/document.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [ApartmentComponent, BuildingComponent, DocumentComponent, UserComponent, RoleComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
