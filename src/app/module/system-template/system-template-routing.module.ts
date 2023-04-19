import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemTemplateCreateComponent } from './components/create/system-template-create.component';
import { systemTemplateReadComponent } from './components/read/system-template-read.component';
import { systemTemplateUpdateComponent } from './components/update/system-template-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemTemplateReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemTemplateCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemTemplateUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemTemplateRoutingModule { }
