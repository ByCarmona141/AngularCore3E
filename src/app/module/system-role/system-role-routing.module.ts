import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemRoleCreateComponent } from './components/create/system-role-create.component';
import { systemRoleReadComponent } from './components/read/system-role-read.component';
import { systemRoleUpdateComponent } from './components/update/system-role-update.component';
import { GuardService } from '../../services/guard.service';
import { PrivilegesComponent } from './components/privileges/privileges.component';

const routes: Routes = [
  { path: '',
    component: systemRoleReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemRoleCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemRoleUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: 'privileges/:id',
    component: PrivilegesComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemRoleRoutingModule { }
