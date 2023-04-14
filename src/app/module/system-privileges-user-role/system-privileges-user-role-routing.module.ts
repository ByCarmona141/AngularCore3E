import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemPrivilegesUserRoleCreateComponent } from './components/create/system-privileges-user-role-create.component';
import { systemPrivilegesUserRoleReadComponent } from './components/read/system-privileges-user-role-read.component';
import { systemPrivilegesUserRoleUpdateComponent } from './components/update/system-privileges-user-role-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemPrivilegesUserRoleReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemPrivilegesUserRoleCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemPrivilegesUserRoleUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemPrivilegesUserRoleRoutingModule { }
