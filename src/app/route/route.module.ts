import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'admin', loadChildren: () =>
                                      import('./admin/admin.module')
                                      .then(m => m.AdminModule)},
  {path: 'admin/user', loadChildren: () =>
                                          import('./admin/user/user.module')
                                          .then(m => m.UserModule)}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RouteModule { }
