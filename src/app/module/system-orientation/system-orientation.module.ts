import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { systemOrientationRoutingModule } from './system-orientation-routing.module';
import { systemOrientationCreateComponent } from './components/create/system-orientation-create.component';
import { systemOrientationReadComponent } from './components/read/system-orientation-read.component';
import { systemOrientationUpdateComponent } from './components/update/system-orientation-update.component';
import { SharedModule } from '../../components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    systemOrientationCreateComponent,
    systemOrientationReadComponent,
    systemOrientationUpdateComponent
  ],
  imports: [
    CommonModule,
    systemOrientationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class systemOrientationModule {
}
