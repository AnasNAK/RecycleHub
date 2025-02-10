import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CollectionService } from '../../core/services/collection.service';
import { User } from '../../core/models/user.interface';
import { Collection } from '../../core/models/collection.interface';
import { IconComponent } from '../../shared/components/icons.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex space-x-8">
              <a routerLink="/dashboard" 
                 routerLinkActive="border-primary text-gray-900"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                        border-transparent text-gray-500 hover:border-primary-light hover:text-gray-700">
                Overview
              </a>
              @if (user?.role === 'collector') {
                <a routerLink="/collections/available"
                   routerLinkActive="border-primary text-gray-900"
                   class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                          border-transparent text-gray-500 hover:border-primary-light hover:text-gray-700">
                  Available Collections
                </a>
              }
            </div>

          </div>
        </div>
      </nav>

      <!-- Dashboard Content -->
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <app-icon name="collection" class="h-6 w-6 text-primary"></app-icon>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Collections</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ collections.length }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <app-icon name="star" class="h-6 w-6 text-primary"></app-icon>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Points</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ user?.points || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <app-icon name="recycle" class="h-6 w-6 text-primary"></app-icon>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Weight Recycled</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ calculateTotalWeight() }}kg</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Collections -->
        <div class="mt-8">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Recent Collections</h2>
            @if (user?.role !== 'collector') {
              <a routerLink="/collections/new"
                 class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                        text-primary bg-primary-light bg-opacity-10 hover:bg-opacity-20 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                <app-icon name="plus" class="h-4 w-4 mr-2"></app-icon>
                New Collection
              </a>
            }
          </div>

          <!-- Collections List -->
          <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              @for (collection of collections; track collection.id) {
                <li>
                  <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <app-icon [name]="collection.materials[0] ? collection.materials[0].type : 'recycle'" 
                                  class="h-8 w-8 text-primary"></app-icon>
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">{{ collection.address }}</p>
                          <p class="text-sm text-gray-500">
                            {{ collection.collectionDate | date }} • {{ collection.timeSlot }}
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <span [ngClass]="{
                          'bg-yellow-100 text-yellow-800': collection.status === 'pending',
                          'bg-primary-light bg-opacity-10 text-primary': collection.status === 'occupied',
                          'bg-green-100 text-green-800': collection.status === 'completed'
                        }" class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {{ collection.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  collections: Collection[] = [];
  totalCollections = 0;
  totalWeight = 0;
  recentCollections: Collection[] = [];
  isMobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadCollections(user.id!);
      }
    });
  }

  loadCollections(userId: string) {
    this.collectionService.getUserCollections(userId).subscribe({
      next: (collections) => {
        this.collections = collections;
        this.totalCollections = collections.length;
        this.totalWeight = this.calculateTotalWeight();
        this.recentCollections = collections.slice(0, 5);
      },
      error: (error) => console.error('Failed to load collections:', error)
    });
  }

  calculateTotalWeight(): number {
    return this.collections.reduce((total, collection) => {
      return total + collection.materials.reduce((materialTotal, material) => {
        return materialTotal + (material.weight || 0);
      }, 0);
    }, 0);
  }

  convertPoints(points: number) {
    if (this.user && this.user.id) {
      // Implement points conversion logic
      const remainingPoints = (this.user.points || 0) - points;
      this.authService.updateUser({ ...this.user, points: remainingPoints }).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          // Show success message
        },
        error: (error) => console.error('Failed to convert points:', error)
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
} 