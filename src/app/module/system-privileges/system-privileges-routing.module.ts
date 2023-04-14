import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemPrivilegesCreateComponent } from './components/create/system-privileges-create.component';
import { systemPrivilegesReadComponent } from './components/read/system-privileges-read.component';
import { systemPrivilegesUpdateComponent } from './components/update/system-privileges-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemPrivilegesReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemPrivilegesCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemPrivilegesUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemPrivilegesRoutingModule { }
