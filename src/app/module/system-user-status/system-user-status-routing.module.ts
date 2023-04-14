import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemUserStatusCreateComponent } from './components/create/system-user-status-create.component';
import { systemUserStatusReadComponent } from './components/read/system-user-status-read.component';
import { systemUserStatusUpdateComponent } from './components/update/system-user-status-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemUserStatusReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemUserStatusCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemUserStatusUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemUserStatusRoutingModule { }
