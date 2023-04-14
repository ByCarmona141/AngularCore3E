import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemTypeElementRoutingModule } from './system-type-element-routing.module';
import { systemTypeElementCreateComponent } from './components/create/system-type-element-create.component';
import { systemTypeElementReadComponent } from './components/read/system-type-element-read.component';
import { systemTypeElementUpdateComponent } from './components/update/system-type-element-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemTypeElementCreateComponent,
    systemTypeElementReadComponent,
    systemTypeElementUpdateComponent
  ],
  imports: [
    CommonModule,
    systemTypeElementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemTypeElementModule {
}
