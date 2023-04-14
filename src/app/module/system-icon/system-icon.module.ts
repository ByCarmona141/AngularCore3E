import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemIconRoutingModule } from './system-icon-routing.module';
import { systemIconCreateComponent } from './components/create/system-icon-create.component';
import { systemIconReadComponent } from './components/read/system-icon-read.component';
import { systemIconUpdateComponent } from './components/update/system-icon-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemIconCreateComponent,
    systemIconReadComponent,
    systemIconUpdateComponent
  ],
  imports: [
    CommonModule,
    systemIconRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemIconModule {
}
