import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemConfigRoutingModule } from './system-config-routing.module';
import { systemConfigCreateComponent } from './components/create/system-config-create.component';
import { systemConfigReadComponent } from './components/read/system-config-read.component';
import { systemConfigUpdateComponent } from './components/update/system-config-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemConfigCreateComponent,
    systemConfigReadComponent,
    systemConfigUpdateComponent
  ],
  imports: [
    CommonModule,
    systemConfigRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemConfigModule {
}
