import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/components/icons.component';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models/user.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <div class="max-w-3xl mx-auto mb-8">
        <button (click)="goBack()" 
                class="flex items-center text-gray-600 hover:text-primary-600">
          <app-icon name="arrow-left" class="w-5 h-5 mr-2"></app-icon>
          Back to Dashboard
        </button>
      </div>

      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
        <div class="p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div class="flex items-center mb-4 sm:mb-0">
              <div class="bg-primary-100 p-3 rounded-full">
                <app-icon name="user" class="w-8 h-8 sm:w-12 sm:h-12 text-primary-600"></app-icon>
              </div>
              <div class="ml-4">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p class="text-sm sm:text-base text-gray-600">Manage your account information</p>
              </div>
            </div>
            <button (click)="onDeleteAccount()" 
                    class="text-red-600 hover:text-red-700 text-sm">
              Delete Account
            </button>
          </div>

          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" formControlName="firstName"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <span *ngIf="profileForm.get('firstName')?.touched && profileForm.get('firstName')?.invalid"
                      class="text-xs text-red-500">First name is required</span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" formControlName="lastName"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" formControlName="email"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" formControlName="phone"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" formControlName="address"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">City</label>
              <input type="text" formControlName="city"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            </div>

            <div class="flex justify-end space-x-4">
              <button type="button" 
                      (click)="goBack()"
                      class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit"
                      [disabled]="profileForm.invalid || profileForm.pristine"
                      class="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div class="bg-gray-50 px-8 py-4 border-t rounded-b-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Recycling Points</h3>
              <p class="text-gray-600">Your current points balance</p>
            </div>
            <div class="text-3xl font-bold text-primary-600">{{ user?.points || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.user) {
      const formValue = this.profileForm.value;
      
      const updatedUser: User = {
        ...this.user,
        firstName: formValue.firstName || this.user.firstName,
        lastName: formValue.lastName || this.user.lastName,
        email: formValue.email || this.user.email,
        phone: formValue.phone || this.user.phone,
        address: formValue.address || this.user.address,
        city: formValue.city || this.user.city
      };

      this.authService.updateUser(updatedUser).subscribe({
        next: () => {
          this.notificationService.show('Profile updated successfully', 'success');
          this.profileForm.markAsPristine();
        },
        error: () => this.notificationService.show('Failed to update profile', 'error')
      });
    }
  }

  onDeleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          this.notificationService.show('Account deleted successfully', 'success');
          this.authService.logout();
        },
        error: () => this.notificationService.show('Failed to delete account', 'error')
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
} 