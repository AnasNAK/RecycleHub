import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { collectorGuard } from './core/guards/collector.guard';
import { MainLayoutComponent } from './shared/components/main-layout.component';

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
        loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent)
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
