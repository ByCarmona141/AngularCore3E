import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemDocumentRoutingModule } from './system-document-routing.module';
import { systemDocumentCreateComponent } from './components/create/system-document-create.component';
import { systemDocumentReadComponent } from './components/read/system-document-read.component';
import { systemDocumentUpdateComponent } from './components/update/system-document-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemDocumentCreateComponent,
    systemDocumentReadComponent,
    systemDocumentUpdateComponent
  ],
  imports: [
    CommonModule,
    systemDocumentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemDocumentModule {
}
