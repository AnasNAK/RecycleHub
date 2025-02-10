import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from '../../core/services/collection.service';
import { NotificationService } from '../../core/services/notification.service';
import { IconComponent } from '../../shared/components/icons.component';
import { MATERIALS } from '../../core/models/material.interface';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs/operators';
import { Collection } from '../../core/models/collection.interface';

@Component({
  selector: 'app-new-collection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <button (click)="goBack()" 
                class="mb-8 flex items-center text-gray-600 hover:text-primary-600">
          <app-icon name="arrow-left" class="w-5 h-5 mr-2"></app-icon>
          Back to Dashboard
        </button>

        <!-- Main Form -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 sm:p-8">
            <div class="mb-8">
              <h1 class="text-2xl font-bold text-gray-900">New Collection Request</h1>
              <p class="mt-2 text-gray-600">Fill in the details for your recycling collection</p>
            </div>

            <form [formGroup]="collectionForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Materials Section -->
              <div formArrayName="materials" class="space-y-4">
                <div class="flex justify-between items-center">
                  <h2 class="text-lg font-medium text-gray-900">Materials</h2>
                  <button type="button" 
                          (click)="addMaterial()"
                          [disabled]="materials.length >= 4"
                          class="btn btn-secondary text-sm">
                    Add Material
                  </button>
                </div>

                <div *ngFor="let material of materials.controls; let i=index" 
                     [formGroupName]="i"
                     class="p-4 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-start">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">Type</label>
                        <select formControlName="type"
                                class="mt-1 block w-full rounded-md border-gray-300">
                          <option value="">Select a material</option>
                          @for (mat of availableMaterials; track mat.id) {
                            <option [value]="mat.id">{{ mat.name }}</option>
                          }
                        </select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input type="number" formControlName="weight"
                               min="1" step="0.1"
                               class="mt-1 block w-full rounded-md border-gray-300">
                      </div>
                    </div>
                    <button type="button" 
                            (click)="removeMaterial(i)"
                            class="ml-4 text-red-600 hover:text-red-700">
                      <app-icon name="trash" class="w-5 h-5"></app-icon>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Collection Details -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Collection Date</label>
                  <input type="date" formControlName="collectionDate"
                         [min]="minDate"
                         class="mt-1 block w-full rounded-md border-gray-300">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Time Slot</label>
                  <select formControlName="timeSlot"
                          class="mt-1 block w-full rounded-md border-gray-300">
                    <option value="">Select a time slot</option>
                    @for (slot of timeSlots; track slot) {
                      <option [value]="slot">{{ slot }}</option>
                    }
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Collection Address</label>
                <textarea formControlName="address"
                         rows="3"
                         class="mt-1 block w-full rounded-md border-gray-300"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Notes (optional)</label>
                <textarea formControlName="notes"
                         rows="3"
                         class="mt-1 block w-full rounded-md border-gray-300"></textarea>
              </div>

              <!-- Error Messages -->
              @if (formErrors.length > 0) {
                <div class="rounded-md bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <app-icon name="error" class="h-5 w-5 text-red-400"></app-icon>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">
                        Please correct the following errors:
                      </h3>
                      <div class="mt-2 text-sm text-red-700">
                        <ul class="list-disc pl-5 space-y-1">
                          @for (error of formErrors; track error) {
                            <li>{{ error }}</li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <!-- Submit Button -->
              <div class="flex justify-end space-x-4">
                <button type="button" 
                        (click)="goBack()"
                        class="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit"
                        [disabled]="!collectionForm.valid || isSubmitting"
                        class="btn btn-primary">
                  {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NewCollectionComponent implements OnInit {
  collectionForm = this.fb.group({
    materials: this.fb.array([], [Validators.required, Validators.maxLength(4)]),
    collectionDate: ['', Validators.required],
    timeSlot: ['', Validators.required],
    address: ['', Validators.required],
    notes: ['']
  });

  availableMaterials = MATERIALS;
  timeSlots = this.generateTimeSlots();
  minDate = new Date().toISOString().split('T')[0];
  isSubmitting = false;
  formErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addMaterial();
  }

  get materials() {
    return this.collectionForm.get('materials') as FormArray;
  }

  addMaterial() {
    if (this.materials.length < 4) {
      this.materials.push(this.fb.group({
        type: ['', Validators.required],
        weight: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
      }));
    }
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }

  private generateTimeSlots(): string[] {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  private validateForm(): string[] {
    const errors: string[] = [];
    const totalWeight = this.materials.controls.reduce(
      (sum, control) => sum + (control.get('weight')?.value || 0),
      0
    );

    if (totalWeight > 10) {
      errors.push('Total weight cannot exceed 10kg');
    }

    if (totalWeight < 1) {
      errors.push('Total weight must be at least 1kg');
    }

    const types = new Set(
      this.materials.controls.map(control => control.get('type')?.value)
    );
    if (types.size !== this.materials.length) {
      errors.push('Each material type can only be selected once');
    }

    return errors;
  }

  onSubmit() {
    this.formErrors = this.validateForm();
    if (this.formErrors.length > 0 || !this.collectionForm.valid) return;

    this.isSubmitting = true;
    const totalWeight = this.materials.controls.reduce(
      (sum, control) => sum + (control.get('weight')?.value || 0),
      0
    );

    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      if (!user?.id) {
        this.notificationService.show('User not found', 'error');
        this.isSubmitting = false;
        return;
      }

      const collection: Omit<Collection, 'id'> = {
        userId: user.id,
        materials: this.materials.value,
        totalWeight,
        address: this.collectionForm.get('address')?.value || '',
        city: user.city,
        collectionDate: this.collectionForm.get('collectionDate')?.value || '',
        timeSlot: this.collectionForm.get('timeSlot')?.value || '',
        notes: this.collectionForm.get('notes')?.value || '',
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: this.materials.value[0].type,
        weight: this.materials.value[0].weight
      };

      this.collectionService.createCollection(collection).subscribe({
        next: () => {
          this.notificationService.show('Collection request submitted successfully', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.notificationService.show('Failed to submit collection request', 'error');
          this.isSubmitting = false;
        }
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
} 