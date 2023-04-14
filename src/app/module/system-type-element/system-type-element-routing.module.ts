import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemTypeElementCreateComponent } from './components/create/system-type-element-create.component';
import { systemTypeElementReadComponent } from './components/read/system-type-element-read.component';
import { systemTypeElementUpdateComponent } from './components/update/system-type-element-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemTypeElementReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemTypeElementCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemTypeElementUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemTypeElementRoutingModule { }
