import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { collectorGuard } from './core/guards/collector.guard';
import { MainLayoutComponent } from './shared/components/main-layout.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { noAuthGuard } from './core/guards/noAuth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'auth',
        component: AuthComponent,

        canActivate: [noAuthGuard],
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
        ]
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'profile',
            loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
          },
          {
            path: 'collections',
            children: [
              {
                path: 'new',
                loadComponent: () => import('./features/collections/new-collection.component').then(m => m.NewCollectionComponent)
              },
              {
                path: 'available',
                loadComponent: () => import('./features/collections/available-collections.component').then(m => m.AvailableCollectionsComponent),
                canActivate: [collectorGuard]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
