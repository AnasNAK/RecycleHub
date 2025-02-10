import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components/icons.component';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IconComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="email" class="form-label">Email address</label>
              <input id="email" type="email" formControlName="email" class="form-input" />
              <div *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched" 
                   class="text-red-500 text-sm mt-1">
                Email is required
              </div>
              <div *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched" 
                   class="text-red-500 text-sm mt-1">
                Please enter a valid email
              </div>
            </div>

            <div>
              <label for="password" class="form-label">Password</label>
              <input id="password" type="password" formControlName="password" class="form-input" />
              <div *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched" 
                   class="text-red-500 text-sm mt-1">
                Password is required
              </div>
            </div>

            <div>
              <button type="submit" 
                      [disabled]="loginForm.invalid || isLoading"
                      class="w-full btn btn-primary disabled:opacity-50">
                @if (isLoading) {
                  <app-icon name="loading" class="animate-spin h-5 w-5 mr-3"></app-icon>
                }
                Sign in
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <a routerLink="/register" class="text-primary hover:text-primary/80">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.notificationService.show('Successfully logged in', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.notificationService.show('Login failed. Please try again.', 'error');
          this.isLoading = false;
        }
      });
    }
  }
} 