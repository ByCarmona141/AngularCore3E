import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemSizeRoutingModule } from './system-size-routing.module';
import { systemSizeCreateComponent } from './components/create/system-size-create.component';
import { systemSizeReadComponent } from './components/read/system-size-read.component';
import { systemSizeUpdateComponent } from './components/update/system-size-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemSizeCreateComponent,
    systemSizeReadComponent,
    systemSizeUpdateComponent
  ],
  imports: [
    CommonModule,
    systemSizeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemSizeModule {
}
