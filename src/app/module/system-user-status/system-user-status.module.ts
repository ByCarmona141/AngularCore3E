import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemUserStatusRoutingModule } from './system-user-status-routing.module';
import { systemUserStatusCreateComponent } from './components/create/system-user-status-create.component';
import { systemUserStatusReadComponent } from './components/read/system-user-status-read.component';
import { systemUserStatusUpdateComponent } from './components/update/system-user-status-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemUserStatusCreateComponent,
    systemUserStatusReadComponent,
    systemUserStatusUpdateComponent
  ],
  imports: [
    CommonModule,
    systemUserStatusRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemUserStatusModule {
}
