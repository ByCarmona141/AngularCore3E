import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemIconCreateComponent } from './components/create/system-icon-create.component';
import { systemIconReadComponent } from './components/read/system-icon-read.component';
import { systemIconUpdateComponent } from './components/update/system-icon-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemIconReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemIconCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemIconUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemIconRoutingModule { }
