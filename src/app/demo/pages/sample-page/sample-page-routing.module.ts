import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SamplePageComponent} from './sample-page.component';
import { GuardService } from '../../../services/guard.service';

const routes: Routes = [
  {
    path: '',
    component: SamplePageComponent,
    canActivate: [ GuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamplePageRoutingModule { }
