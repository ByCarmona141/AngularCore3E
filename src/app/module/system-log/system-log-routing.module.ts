import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemLogCreateComponent } from './components/create/system-log-create.component';
import { systemLogReadComponent } from './components/read/system-log-read.component';
import { systemLogUpdateComponent } from './components/update/system-log-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemLogReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemLogCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemLogUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemLogRoutingModule { }
