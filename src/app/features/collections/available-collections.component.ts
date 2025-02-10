import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../core/services/collection.service';
import { AuthService } from '../../core/services/auth.service';
import { Collection } from '../../core/models/collection.interface';
import { IconComponent } from '../../shared/components/icons.component';
import { NotificationService } from '../../core/services/notification.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-available-collections',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Available Collections</h1>
            <p class="mt-1 text-sm text-gray-500">View and manage collection requests in your area.</p>
          </div>
          <div class="flex items-center space-x-3">
            <select (change)="filterByStatus($event)" 
                    class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="occupied">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Collection Grid -->
        @if (collections.length) {
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (collection of collections; track collection.id) {
              <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div class="p-6">
                  <!-- Header -->
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">
                        {{ collection.address }}
                      </h3>
                      <div class="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <app-icon name="calendar" class="h-4 w-4"></app-icon>
                        <span>{{ collection.collectionDate | date }}</span>
                        <span>•</span>
                        <span>{{ collection.timeSlot }}</span>
                      </div>
                    </div>
                    <span [ngClass]="{
                      'bg-yellow-100 text-yellow-800': collection.status === 'pending',
                      'bg-blue-100 text-blue-800': collection.status === 'occupied',
                      'bg-green-100 text-green-800': collection.status === 'completed'
                    }" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ collection.status }}
                    </span>
                  </div>

                  <!-- Materials -->
                  <div class="mt-4">
                    <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wide">Materials</h4>
                    <div class="mt-2 flex flex-wrap gap-2">
                      @for (material of collection.materials; track material.type) {
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                          <app-icon [name]="material.type" class="h-4 w-4 mr-1.5 text-gray-500"></app-icon>
                          <span class="font-medium text-gray-900">{{ material.weight }}</span>
                          <span class="ml-1 text-gray-500">kg</span>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Notes -->
                  @if (collection.notes) {
                    <div class="mt-4">
                      <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</h4>
                      <p class="mt-1 text-sm text-gray-600">{{ collection.notes }}</p>
                    </div>
                  }

                  <!-- Action Button -->
                  @if (collection.status === 'pending') {
                    <button (click)="acceptCollection(collection)"
                            class="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <app-icon name="check" class="h-4 w-4 mr-1.5"></app-icon>
                      Accept Collection
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="text-center py-12">
            <app-icon name="collection" class="mx-auto h-12 w-12 text-gray-400"></app-icon>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No collections</h3>
            <p class="mt-1 text-sm text-gray-500">No collections available in your area right now.</p>
          </div>
        }
      </div>
    </div>
  `
})
export class AvailableCollectionsComponent implements OnInit {
  collections: Collection[] = [];
  currentFilter = 'all';

  constructor(
    private collectionService: CollectionService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAvailableCollections();
  }

  filterByStatus(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentFilter = select.value;
    this.loadAvailableCollections();
  }

  private loadAvailableCollections(): void {
    this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.city) return [];
        return this.collectionService.getAllCollections().pipe(
          map(collections => collections.filter(collection => 
            collection.city.toLowerCase() === user.city.toLowerCase() &&
            (this.currentFilter === 'all' || collection.status === this.currentFilter)
          ))
        );
      })
    ).subscribe({
      next: (collections) => {
        this.collections = collections;
      }
    });
  }

  acceptCollection(collection: Collection): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        const updatedCollection = {
          ...collection,
          status: 'occupied' as const,
          collectorId: user.id
        };
        this.collectionService.updateCollection(updatedCollection).subscribe({
          next: () => {
            this.notificationService.show('Collection accepted successfully', 'success');
            this.loadAvailableCollections();
          },
          error: () => {
            this.notificationService.show('Failed to accept collection', 'error');
          }
        });
      }
    });
  }
} 