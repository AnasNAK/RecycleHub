import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section with Dark Theme -->
    <div class="relative bg-gray-900 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-gray-900"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div class="mb-12 lg:mb-0 z-10">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Transform Waste into
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                Rewards
              </span>
            </h1>
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              Join the eco-revolution. Every piece of recycling counts towards a greener future 
              and earns you points for amazing rewards.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a routerLink="/auth/register" 
                 class="btn-primary px-8 py-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-400 
                        transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25
                        text-center relative overflow-hidden group">
                <span class="relative z-10">Get Started</span>
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-400 opacity-0 
                           group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a routerLink="/auth/login" 
                 class="btn-secondary px-8 py-4 rounded-lg text-emerald-400 border-2 border-emerald-400/50 
                        hover:border-emerald-400 hover:bg-emerald-400/10 transition-all text-center">
                Sign In
              </a>
            </div>
          </div>
          
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl 
                        transform hover:scale-[1.02] transition-transform">
              <img src="assets/images/Landing.png" alt="Recycling" 
                   class="w-full rounded-2xl">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>
            
            <!-- Floating Stats -->
            <div class="absolute -bottom-6 -right-6 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 
                        shadow-xl border border-gray-700">
              <p class="text-emerald-400 font-semibold">Join 1000+ eco-warriors</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section with Glass Effect -->
    <div class="bg-gray-900 py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p class="text-gray-400 text-lg">Simple steps to start your recycling journey</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step Cards with Glass Effect -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl 
                        blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 
                       border border-gray-700/50 h-full transform hover:scale-[1.02] transition-all">
              <img src="assets/images/Jabitor.png" alt="Collect" 
                   class="w-20 h-20 mx-auto mb-6 object-contain">
              <h3 class="text-xl font-semibold text-white mb-3">Collect & Sort</h3>
              <p class="text-gray-400">Gather your recyclables and sort them by category</p>
            </div>
          </div>

          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl 
                        blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 
                       border border-gray-700/50 h-full transform hover:scale-[1.02] transition-all">
              <img src="assets/images/Car.png" alt="Schedule" 
                   class="w-20 h-20 mx-auto mb-6 object-contain">
              <h3 class="text-xl font-semibold text-white mb-3">Schedule Pickup</h3>
              <p class="text-gray-400">Book a convenient time for collection</p>
            </div>
          </div>

          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl 
                        blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 
                       border border-gray-700/50 h-full transform hover:scale-[1.02] transition-all">
              <img src="assets/images/Bean.png" alt="Earn" 
                   class="w-20 h-20 mx-auto mb-6 object-contain">
              <h3 class="text-xl font-semibold text-white mb-3">Earn Points</h3>
              <p class="text-gray-400">Get rewarded for your environmental impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact Stats Section -->
    <div class="bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.15),transparent)]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div class="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div class="text-4xl font-bold text-emerald-400 mb-2">1,234</div>
            <div class="text-gray-400">Tons Recycled</div>
          </div>
          <div class="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div class="text-4xl font-bold text-emerald-400 mb-2">5,678</div>
            <div class="text-gray-400">Active Members</div>
          </div>
          <div class="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div class="text-4xl font-bold text-emerald-400 mb-2">90%</div>
            <div class="text-gray-400">Waste Reduction</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
        <h2 class="text-3xl font-bold text-white mb-8">Ready to Make a Difference?</h2>
        <div class="inline-flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/auth/register" 
             class="px-8 py-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-400 
                    transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
            Join Now
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #111827;
    }
    
    .btn-primary, .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.2s;
    }
  `]
})
export class HomeComponent {} 