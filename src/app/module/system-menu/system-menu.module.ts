import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemMenuRoutingModule } from './system-menu-routing.module';
import { systemMenuCreateComponent } from './components/create/system-menu-create.component';
import { systemMenuReadComponent } from './components/read/system-menu-read.component';
import { systemMenuUpdateComponent } from './components/update/system-menu-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemMenuCreateComponent,
    systemMenuReadComponent,
    systemMenuUpdateComponent
  ],
  imports: [
    CommonModule,
    systemMenuRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemMenuModule {
}
