import { DocumentComponent } from './document.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [DocumentComponent, AddDialogComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DocumentModule { }
