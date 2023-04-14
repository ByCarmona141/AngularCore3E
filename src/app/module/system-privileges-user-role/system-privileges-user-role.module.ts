import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemPrivilegesUserRoleRoutingModule } from './system-privileges-user-role-routing.module';
import { systemPrivilegesUserRoleCreateComponent } from './components/create/system-privileges-user-role-create.component';
import { systemPrivilegesUserRoleReadComponent } from './components/read/system-privileges-user-role-read.component';
import { systemPrivilegesUserRoleUpdateComponent } from './components/update/system-privileges-user-role-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemPrivilegesUserRoleCreateComponent,
    systemPrivilegesUserRoleReadComponent,
    systemPrivilegesUserRoleUpdateComponent
  ],
  imports: [
    CommonModule,
    systemPrivilegesUserRoleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemPrivilegesUserRoleModule {
}
