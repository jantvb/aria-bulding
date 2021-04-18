import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module')
                                       .then(m => m.AdminModule) },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [RouterModule]
})
export class RouteModule { }
