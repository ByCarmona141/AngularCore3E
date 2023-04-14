import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemMenuCreateComponent } from './components/create/system-menu-create.component';
import { systemMenuReadComponent } from './components/read/system-menu-read.component';
import { systemMenuUpdateComponent } from './components/update/system-menu-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemMenuReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemMenuCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemMenuUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemMenuRoutingModule { }
