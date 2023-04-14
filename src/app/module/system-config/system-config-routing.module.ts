import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemConfigCreateComponent } from './components/create/system-config-create.component';
import { systemConfigReadComponent } from './components/read/system-config-read.component';
import { systemConfigUpdateComponent } from './components/update/system-config-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemConfigReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemConfigCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemConfigUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemConfigRoutingModule { }
