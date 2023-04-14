import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { SamplePageComponent } from './demo/pages/sample-page/sample-page.component';
import { LoggedGuard } from './services/logged.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [LoggedGuard],
        children: [
            {
                path: '',
                redirectTo: 'sample-page',
                pathMatch: 'full',
            },
            {
                path: 'sample-page',
                component: SamplePageComponent
            },
            {
                path: 'systemAction',
                loadChildren: () => import('./module/system-action/system-action.module')
                    .then(m => m.systemActionModule)
            },
            {
                path: 'systemConfig',
                loadChildren: () => import('./module/system-config/system-config.module')
                    .then(m => m.systemConfigModule)
            },
            {
                path: 'systemIcon',
                loadChildren: () => import('./module/system-icon/system-icon.module')
                    .then(m => m.systemIconModule)
            },
            {
                path: 'systemLog',
                loadChildren: () => import('./module/system-log/system-log.module')
                    .then(m => m.systemLogModule)
            },
            {
                path: 'systemMenu',
                loadChildren: () => import('./module/system-menu/system-menu.module')
                    .then(m => m.systemMenuModule)
            },
            {
                path: 'systemPrivileges',
                loadChildren: () => import('./module/system-privileges/system-privileges.module')
                    .then(m => m.systemPrivilegesModule)
            },
            {
                path: 'systemPrivilegesUserRole',
                loadChildren: () => import('./module/system-privileges-user-role/system-privileges-user-role.module')
                    .then(m => m.systemPrivilegesUserRoleModule)
            },
            {
                path: 'systemRepository',
                loadChildren: () => import('./module/system-repository/system-repository.module')
                    .then(m => m.systemRepositoryModule)
            },
            {
                path: 'systemRole',
                loadChildren: () => import('./module/system-role/system-role.module')
                    .then(m => m.systemRoleModule)
            },
            {
                path: 'systemTypeElement',
                loadChildren: () => import('./module/system-type-element/system-type-element.module')
                    .then(m => m.systemTypeElementModule)
            },
            {
                path: 'systemUser',
                loadChildren: () => import('./module/system-user/system-user.module')
                    .then(m => m.systemUserModule)
            },
            {
                path: 'systemUserStatus',
                loadChildren: () => import('./module/system-user-status/system-user-status.module')
                    .then(m => m.systemUserStatusModule)
            },
        ]
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./module/login/login.module').then(module => module.LoginModule)
            },
            {
                path: 'auth/reset-password',
                loadChildren: () => import('./module/auth-reset-password/auth-reset-password.module')
                    .then(module => module.AuthResetPasswordModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
