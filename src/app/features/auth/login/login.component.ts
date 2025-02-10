import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col space-y-4 sm:space-y-6 w-full max-w-md mx-auto p-4 sm:p-0">
      <div class="text-center">
        <img src="assets/images/Landing.png" alt="RecycleHub" 
             class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-4">
        <p class="text-sm sm:text-base text-gray-600">Sign in to your account to start recycling</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4 sm:space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input id="email" 
                   type="email" 
                   formControlName="email"
                   class="pl-10 form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
                   placeholder="you@example.com">
          </div>
          <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']" 
               class="mt-1 text-xs sm:text-sm text-red-600">
            Email is required
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input id="password" 
                   type="password" 
                   formControlName="password"
                   class="pl-10 form-input block w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
                   placeholder="••••••••">
          </div>
          <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']" 
               class="mt-1 text-xs sm:text-sm text-red-600">
            Password is required
          </div>
        </div>

        <div class="pt-2">
          <button type="submit"
                  [disabled]="loginForm.invalid"
                  class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm sm:text-base font-medium text-white bg-emerald-600 hover:bg-emerald-500 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            Sign in
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
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.notificationService.show('Successfully logged in', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.notificationService.show('Login failed. Please try again.', 'error');
        }
      });
    }
  }
} 