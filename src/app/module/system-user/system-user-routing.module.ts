import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemUserCreateComponent } from './components/create/system-user-create.component';
import { systemUserReadComponent } from './components/read/system-user-read.component';
import { systemUserUpdateComponent } from './components/update/system-user-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemUserReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemUserCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemUserUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemUserRoutingModule { }
