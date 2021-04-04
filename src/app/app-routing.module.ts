import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { AuthGuard } from './auth.guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'employees',
        loadChildren: () => import('./pages/template/modules/employees/employees.module').then(m => m.EmployeesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'groups',
        loadChildren: () => import('./pages/template/modules/groups/groups.module').then(m => m.GroupsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/template/modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
