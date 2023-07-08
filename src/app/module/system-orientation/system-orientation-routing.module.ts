import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemOrientationCreateComponent } from './components/create/system-orientation-create.component';
import { systemOrientationReadComponent } from './components/read/system-orientation-read.component';
import { systemOrientationUpdateComponent } from './components/update/system-orientation-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemOrientationReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemOrientationCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemOrientationUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemOrientationRoutingModule { }
