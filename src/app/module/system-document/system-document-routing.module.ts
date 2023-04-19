import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { systemDocumentCreateComponent } from './components/create/system-document-create.component';
import { systemDocumentReadComponent } from './components/read/system-document-read.component';
import { systemDocumentUpdateComponent } from './components/update/system-document-update.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  { path: '',
    component: systemDocumentReadComponent, canActivate: [ GuardService ], data: { privilege: 4 }
  },
  { path: 'create',
    component: systemDocumentCreateComponent, canActivate: [ GuardService ], data: { privilege: 1 }
  },
  { path: 'update/:id',
    component: systemDocumentUpdateComponent, canActivate: [ GuardService ], data: { privilege: 3 }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class systemDocumentRoutingModule { }
