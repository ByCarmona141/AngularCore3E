import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemActionCreateComponent } from './components/create/system-action-create.component';
import { systemActionReadComponent } from './components/read/system-action-read.component';
import { systemActionUpdateComponent } from './components/update/system-action-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemActionReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemActionCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemActionUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemActionRoutingModule { }
