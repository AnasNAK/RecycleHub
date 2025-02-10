import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="form-label">First Name</label>
          <input id="firstName" type="text" formControlName="firstName" class="form-input" />
          <div *ngIf="registerForm.get('firstName')?.errors?.['required'] && registerForm.get('firstName')?.touched" 
               class="text-red-500 text-sm mt-1">
            First name is required
          </div>
        </div>
        <div>
          <label for="lastName" class="form-label">Last Name</label>
          <input id="lastName" type="text" formControlName="lastName" class="form-input" />
          <div *ngIf="registerForm.get('lastName')?.errors?.['required'] && registerForm.get('lastName')?.touched" 
               class="text-red-500 text-sm mt-1">
            Last name is required
          </div>
        </div>
      </div>

      <div>
        <label for="email" class="form-label">Email</label>
        <input id="email" type="email" formControlName="email" class="form-input" />
        <div *ngIf="registerForm.get('email')?.errors?.['required'] && registerForm.get('email')?.touched" 
             class="text-red-500 text-sm mt-1">
          Email is required
        </div>
        <div *ngIf="registerForm.get('email')?.errors?.['email'] && registerForm.get('email')?.touched" 
             class="text-red-500 text-sm mt-1">
          Please enter a valid email
        </div>
      </div>

      <div>
        <label for="password" class="form-label">Password</label>
        <input id="password" type="password" formControlName="password" class="form-input" />
        <div *ngIf="registerForm.get('password')?.errors?.['required'] && registerForm.get('password')?.touched" 
             class="text-red-500 text-sm mt-1">
          Password is required
        </div>
      </div>

      <div>
        <label for="phone" class="form-label">Phone</label>
        <input id="phone" type="tel" formControlName="phone" class="form-input" />
        <div *ngIf="registerForm.get('phone')?.errors?.['required'] && registerForm.get('phone')?.touched" 
             class="text-red-500 text-sm mt-1">
          Phone is required
        </div>
      </div>

      <div>
        <label for="address" class="form-label">Address</label>
        <input id="address" type="text" formControlName="address" class="form-input" />
        <div *ngIf="registerForm.get('address')?.errors?.['required'] && registerForm.get('address')?.touched" 
             class="text-red-500 text-sm mt-1">
          Address is required
        </div>
      </div>

      <div>
        <label for="city" class="form-label">City</label>
        <input id="city" type="text" formControlName="city" class="form-input" />
        <div *ngIf="registerForm.get('city')?.errors?.['required'] && registerForm.get('city')?.touched" 
             class="text-red-500 text-sm mt-1">
          City is required
        </div>
      </div>

      <div>
        <label for="dateOfBirth" class="form-label">Date of Birth</label>
        <input id="dateOfBirth" type="date" formControlName="dateOfBirth" class="form-input" />
        <div *ngIf="registerForm.get('dateOfBirth')?.errors?.['required'] && registerForm.get('dateOfBirth')?.touched" 
             class="text-red-500 text-sm mt-1">
          Date of birth is required
        </div>
      </div>

      <div>
        <button type="submit" 
                [disabled]="registerForm.invalid"
                class="w-full btn btn-primary disabled:opacity-50">
          Register
        </button>
      </div>
    </form>
  `
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
    private router: Router
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
        next: () => this.router.navigate(['/dashboard']),
        error: (error) => console.error('Registration failed:', error)
      });
    }
  }
} 