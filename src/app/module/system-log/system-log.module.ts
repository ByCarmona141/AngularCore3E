import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemLogRoutingModule } from './system-log-routing.module';
import { systemLogCreateComponent } from './components/create/system-log-create.component';
import { systemLogReadComponent } from './components/read/system-log-read.component';
import { systemLogUpdateComponent } from './components/update/system-log-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemLogCreateComponent,
    systemLogReadComponent,
    systemLogUpdateComponent
  ],
  imports: [
    CommonModule,
    systemLogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemLogModule {
}
