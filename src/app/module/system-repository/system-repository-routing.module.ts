import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemRepositoryCreateComponent } from './components/create/system-repository-create.component';
import { systemRepositoryReadComponent } from './components/read/system-repository-read.component';
import { systemRepositoryUpdateComponent } from './components/update/system-repository-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemRepositoryReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemRepositoryCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemRepositoryUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemRepositoryRoutingModule { }
