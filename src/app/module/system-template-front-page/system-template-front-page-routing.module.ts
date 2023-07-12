import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemTemplateFrontPageCreateComponent } from './components/create/system-template-front-page-create.component';
import { systemTemplateFrontPageReadComponent } from './components/read/system-template-front-page-read.component';
import { systemTemplateFrontPageUpdateComponent } from './components/update/system-template-front-page-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemTemplateFrontPageReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemTemplateFrontPageCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemTemplateFrontPageUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemTemplateFrontPageRoutingModule { }
