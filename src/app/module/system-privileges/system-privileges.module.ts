import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemPrivilegesRoutingModule } from './system-privileges-routing.module';
import { systemPrivilegesCreateComponent } from './components/create/system-privileges-create.component';
import { systemPrivilegesReadComponent } from './components/read/system-privileges-read.component';
import { systemPrivilegesUpdateComponent } from './components/update/system-privileges-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemPrivilegesCreateComponent,
    systemPrivilegesReadComponent,
    systemPrivilegesUpdateComponent
  ],
  imports: [
    CommonModule,
    systemPrivilegesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemPrivilegesModule {
}
