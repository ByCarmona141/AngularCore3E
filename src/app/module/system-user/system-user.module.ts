import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemUserRoutingModule } from './system-user-routing.module';
import { systemUserCreateComponent } from './components/create/system-user-create.component';
import { systemUserReadComponent } from './components/read/system-user-read.component';
import { systemUserUpdateComponent } from './components/update/system-user-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemUserCreateComponent,
    systemUserReadComponent,
    systemUserUpdateComponent
  ],
  imports: [
    CommonModule,
    systemUserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemUserModule {
}
