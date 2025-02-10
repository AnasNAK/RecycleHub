import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from './icons.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Main Nav -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center">
              <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span class="ml-2 text-xl font-bold text-primary">RecycleHub</span>
            </a>

            @if (user$ | async; as user) {
              <div class="hidden md:flex items-center ml-8 space-x-4">
                <a routerLink="/dashboard" 
                   routerLinkActive="text-primary-600"
                   class="text-gray-600 hover:text-primary-600">
                  Dashboard
                </a>
                @if (user.role === 'collector') {
                  <a routerLink="/collections/available"
                     routerLinkActive="text-primary-600"
                     class="text-gray-600 hover:text-primary-600">
                    Available Collections
                  </a>
                }
                <a routerLink="/profile"
                   routerLinkActive="text-primary-600"
                   class="text-gray-600 hover:text-primary-600">
                  Profile
                </a>
              </div>
            }
          </div>

          <!-- User Menu -->
          <div class="flex items-center">
            @if (user$ | async; as user) {
              <div class="hidden md:flex items-center space-x-4">
                <span class="text-gray-600">Points: {{ user.points }}</span>
                <button (click)="logout()" class="btn btn-primary">
                  Logout
                </button>
              </div>
              <!-- Mobile Menu Button -->
              <button (click)="toggleMobileMenu()" 
                      class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <app-icon [name]="isMobileMenuOpen ? 'close' : 'menu'" class="h-6 w-6"></app-icon>
              </button>
            } @else {
              <div class="flex items-center space-x-4">
                <a routerLink="/auth/login" 
                   class="btn btn-primary">
                  Get Started
                </a>
              </div>
            }
          </div>
        </div>

        <!-- Mobile Menu -->
        @if (isMobileMenuOpen && (user$ | async)) {
          <div class="md:hidden py-2">
            <div class="space-y-1">
              <a routerLink="/dashboard"
                 routerLinkActive="text-primary-600"
                 class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600">
                Dashboard
              </a>
              @if ((user$ | async)?.role === 'collector') {
                <a routerLink="/collections/available"
                   routerLinkActive="text-primary-600"
                   class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600">
                  Available Collections
                </a>
              }
              <a routerLink="/profile"
                 routerLinkActive="text-primary-600"
                 class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600">
                Profile
              </a>
              <div class="px-3 py-2 space-y-2">
                <span class="block text-gray-600">Points: {{ (user$ | async)?.points }}</span>
                <button (click)="logout()" class="w-full btn btn-primary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </nav>
  `
})
export class NavBarComponent {
  user$ = this.authService.currentUser$;
  isMobileMenuOpen = false;

  constructor(private authService: AuthService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
} 