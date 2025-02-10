import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col space-y-4 sm:space-y-6 w-full max-w-md mx-auto p-4 sm:p-0">
      <div class="text-center">
        <img src="assets/images/Landing.png" alt="RecycleHub" 
             class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-4">
        <p class="text-sm sm:text-base text-gray-600">Create your account to start recycling</p>
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4 sm:space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input id="firstName" type="text" formControlName="firstName"
                   class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
            <div *ngIf="registerForm.get('firstName')?.touched && registerForm.get('firstName')?.errors?.['required']" 
                 class="mt-1 text-xs sm:text-sm text-red-600">First name is required</div>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input id="lastName" type="text" formControlName="lastName"
                   class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
            <div *ngIf="registerForm.get('lastName')?.touched && registerForm.get('lastName')?.errors?.['required']" 
                 class="mt-1 text-xs sm:text-sm text-red-600">Last name is required</div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" formControlName="email"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
          <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors?.['required']" 
               class="mt-1 text-xs sm:text-sm text-red-600">Email is required</div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" type="password" formControlName="password"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
          <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors?.['required']" 
               class="mt-1 text-xs sm:text-sm text-red-600">Password is required</div>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input id="phone" type="tel" formControlName="phone"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input id="address" type="text" formControlName="address"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
        </div>

        <div>
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input id="city" type="text" formControlName="city"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
        </div>

        <div>
          <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input id="dateOfBirth" type="date" formControlName="dateOfBirth"
                 class="form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base">
        </div>

        <div class="pt-2">
          <button type="submit"
                  [disabled]="registerForm.invalid"
                  class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm sm:text-base font-medium text-white bg-emerald-600 hover:bg-emerald-500 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            Create Account
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class RegisterComponent {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    role: ['user']
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      
      const user = {
        firstName: formValue.firstName ?? '',
        lastName: formValue.lastName ?? '',
        email: formValue.email ?? '',
        password: formValue.password ?? '',
        phone: formValue.phone ?? '',
        address: formValue.address ?? '',
        city: formValue.city ?? '',
        dateOfBirth: formValue.dateOfBirth ?? '',
        role: 'user' as const,
        points: 0
      };

      this.authService.register(user).subscribe({
        next: () => {
          this.notificationService.show('Registration successful', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.notificationService.show('Registration failed. Please try again.', 'error');
        }
      });
    }
  }
} 