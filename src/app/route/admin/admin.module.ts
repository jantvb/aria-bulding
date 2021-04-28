import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { AdminComponent } from './admin.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UserMenuComponent } from './common/user-menu/user-menu.component';

@NgModule({
  declarations: [
    SidenavComponent,
    AdminComponent,
    MainMenuComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    AdminRoutingModule,
    MatDialogModule,
    MatMenuModule
  ]

})
export class AdminModule { }
