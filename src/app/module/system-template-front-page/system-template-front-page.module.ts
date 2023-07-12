import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemTemplateFrontPageRoutingModule } from './system-template-front-page-routing.module';
import { systemTemplateFrontPageCreateComponent } from './components/create/system-template-front-page-create.component';
import { systemTemplateFrontPageReadComponent } from './components/read/system-template-front-page-read.component';
import { systemTemplateFrontPageUpdateComponent } from './components/update/system-template-front-page-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemTemplateFrontPageCreateComponent,
    systemTemplateFrontPageReadComponent,
    systemTemplateFrontPageUpdateComponent
  ],
  imports: [
    CommonModule,
    systemTemplateFrontPageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemTemplateFrontPageModule {
}
