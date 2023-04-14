import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemRoleRoutingModule } from './system-role-routing.module';
import { systemRoleCreateComponent } from './components/create/system-role-create.component';
import { systemRoleReadComponent } from './components/read/system-role-read.component';
import { systemRoleUpdateComponent } from './components/update/system-role-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivilegesComponent } from './components/privileges/privileges.component';

@NgModule({
  declarations: [
    systemRoleCreateComponent,
    systemRoleReadComponent,
    systemRoleUpdateComponent,
      PrivilegesComponent
  ],
  imports: [
    CommonModule,
    systemRoleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemRoleModule {
}
