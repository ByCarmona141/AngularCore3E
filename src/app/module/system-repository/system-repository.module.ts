import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemRepositoryRoutingModule } from './system-repository-routing.module';
import { systemRepositoryCreateComponent } from './components/create/system-repository-create.component';
import { systemRepositoryReadComponent } from './components/read/system-repository-read.component';
import { systemRepositoryUpdateComponent } from './components/update/system-repository-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemRepositoryCreateComponent,
    systemRepositoryReadComponent,
    systemRepositoryUpdateComponent
  ],
  imports: [
    CommonModule,
    systemRepositoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemRepositoryModule {
}
