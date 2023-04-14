import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemActionRoutingModule } from './system-action-routing.module';
import { systemActionCreateComponent } from './components/create/system-action-create.component';
import { systemActionReadComponent } from './components/read/system-action-read.component';
import { systemActionUpdateComponent } from './components/update/system-action-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemActionCreateComponent,
    systemActionReadComponent,
    systemActionUpdateComponent
  ],
  imports: [
    CommonModule,
    systemActionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemActionModule {
}
