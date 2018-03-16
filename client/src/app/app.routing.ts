import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './form/login/login.component';
import { UserComponent } from './form/user/user.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'new-user', component: UserComponent },
    { path: 'edit-user/:id', component: UserComponent },
    { path: '**', component: LoginComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);