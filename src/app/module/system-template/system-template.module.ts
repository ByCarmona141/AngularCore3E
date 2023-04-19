import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemTemplateRoutingModule } from './system-template-routing.module';
import { systemTemplateCreateComponent } from './components/create/system-template-create.component';
import { systemTemplateReadComponent } from './components/read/system-template-read.component';
import { systemTemplateUpdateComponent } from './components/update/system-template-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemTemplateCreateComponent,
    systemTemplateReadComponent,
    systemTemplateUpdateComponent
  ],
  imports: [
    CommonModule,
    systemTemplateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemTemplateModule {
}
