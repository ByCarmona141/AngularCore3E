import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemSizeCreateComponent } from './components/create/system-size-create.component';
import { systemSizeReadComponent } from './components/read/system-size-read.component';
import { systemSizeUpdateComponent } from './components/update/system-size-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemSizeReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemSizeCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemSizeUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemSizeRoutingModule { }
