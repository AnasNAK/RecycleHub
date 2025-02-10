import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LoginComponent, RegisterComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Welcome to RecycleHub
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <!-- Form Content with Animation -->
          <div class="relative overflow-hidden">
            <div [@slideAnimation]="getAnimationState(outlet)">
              <router-outlet #outlet="outlet"></router-outlet>
            </div>
          </div>

          <!-- Switch Form Link -->
          <div class="mt-6 text-center">
            @if (isLoginRoute()) {
              <div class="flex items-center justify-center space-x-2">
                <p class="text-sm text-gray-600">Don't have an account?</p>
                <a routerLink="../register" 
                   class="flex items-center text-sm text-primary hover:text-primary-dark">
                  Register
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            } @else {
              <div class="flex items-center justify-center space-x-2">
                <p class="text-sm text-gray-600">Already have an account?</p>
                <a routerLink="../login" 
                   class="flex items-center text-sm text-primary hover:text-primary-dark">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Sign in
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AuthComponent {
  isLoginRoute(): boolean {
    return window.location.pathname.includes('/login');
  }

  getAnimationState(outlet: RouterOutlet): string {
    return outlet && outlet.activatedRouteData ? outlet.activatedRouteData['path'] : 'void';
  }
} 