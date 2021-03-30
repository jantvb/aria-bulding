import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
