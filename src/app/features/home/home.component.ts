import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icons.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Make recycling</span>
                <span class="block text-primary">rewarding & easy</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join our community of eco-conscious individuals and make a difference. 
                Earn rewards for your recycling efforts and help create a sustainable future.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                @if (!(isAuthenticated$ | async)) {
                  <div class="rounded-md shadow">
                    <a routerLink="/auth" 
                       class="w-full flex items-center justify-center px-8 py-3 border border-transparent 
                              text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark 
                              md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </div>
                } @else {
                  <div class="rounded-md shadow">
                    <a routerLink="/dashboard" 
                       class="w-full flex items-center justify-center px-8 py-3 border border-transparent 
                              text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark 
                              md:py-4 md:text-lg md:px-10">
                      Go to Dashboard
                    </a>
                  </div>
                }
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
             src="assets/images/hero-recycling.jpg" 
             alt="Recycling">
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to recycle
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <!-- Feature 1 -->
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <app-icon name="recycle" class="h-6 w-6"></app-icon>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Collection</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Schedule pickups at your convenience and let our certified collectors handle the rest.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <app-icon name="star" class="h-6 w-6"></app-icon>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Earn Rewards</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Get points for every kilogram of recyclables and convert them into valuable rewards.
              </p>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <app-icon name="earth" class="h-6 w-6"></app-icon>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Track Impact</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Monitor your environmental impact and see how your efforts make a difference.
              </p>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <app-icon name="user" class="h-6 w-6"></app-icon>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Professional Collectors</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Our certified collectors ensure proper handling and recycling of your materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to start recycling?</span>
          <span class="block text-primary-light">Join RecycleHub today.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-white opacity-90">
          Make a difference in your community while earning rewards for your eco-friendly actions.
        </p>
        @if (!(isAuthenticated$ | async)) {
          <a routerLink="/auth"
             class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent 
                    text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 sm:w-auto">
            Get started
          </a>
        }
      </div>
    </div>
  `
})
export class HomeComponent {
  isAuthenticated$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}
} 