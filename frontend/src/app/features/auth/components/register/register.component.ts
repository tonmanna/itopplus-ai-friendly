import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Create an account</h2>
          <p class="mt-2 text-gray-600">Join our community today</p>
        </div>

        <!-- Social Register Buttons -->
        <div class="space-y-3">
          <button
            (click)="socialRegister('google')"
            class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img src="assets/icons/google.svg" alt="Google" class="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            (click)="socialRegister('facebook')"
            class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="assets/icons/facebook.svg"
              alt="Facebook"
              class="w-5 h-5"
            />
            <span>Continue with Facebook</span>
          </button>

          <button
            (click)="socialRegister('microsoft')"
            class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="assets/icons/microsoft.svg"
              alt="Microsoft"
              class="w-5 h-5"
            />
            <span>Continue with Microsoft</span>
          </button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Or register with</span>
          </div>
        </div>

        <!-- Register Form -->
        <form
          [formGroup]="registerForm"
          (ngSubmit)="onSubmit()"
          class="mt-8 space-y-6"
        >
          <!-- Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="isFieldInvalid('firstName')"
              />
              <p
                *ngIf="isFieldInvalid('firstName')"
                class="mt-1 text-sm text-red-600"
              >
                First name is required
              </p>
            </div>

            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="isFieldInvalid('lastName')"
              />
              <p
                *ngIf="isFieldInvalid('lastName')"
                class="mt-1 text-sm text-red-600"
              >
                Last name is required
              </p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            <p
              *ngIf="isFieldInvalid('email')"
              class="mt-1 text-sm text-red-600"
            >
              Please enter a valid email address
            </p>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            <p
              *ngIf="isFieldInvalid('password')"
              class="mt-1 text-sm text-red-600"
            >
              Password must be at least 8 characters long and include a number
              and a special character
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              formControlName="confirmPassword"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('confirmPassword')"
            />
            <p
              *ngIf="isFieldInvalid('confirmPassword')"
              class="mt-1 text-sm text-red-600"
            >
              Passwords do not match
            </p>
          </div>

          <!-- Terms -->
          <div class="flex items-center">
            <input
              id="terms"
              type="checkbox"
              formControlName="terms"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
                >Terms of Service</a
              >
              and
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
                >Privacy Policy</a
              >
            </label>
          </div>
          <p *ngIf="isFieldInvalid('terms')" class="mt-1 text-sm text-red-600">
            You must accept the terms and conditions
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="registerForm.invalid || submitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ submitting ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <a
            routerLink="/auth/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </a>
        </p>

        <!-- Error Alert -->
        <app-alert
          *ngIf="errorMessage"
          type="error"
          [message]="errorMessage"
          [dismissible]="true"
          (dismissed)="errorMessage = ''"
        >
        </app-alert>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.registerForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  socialRegister(provider: 'google' | 'facebook' | 'microsoft'): void {
    this.submitting = true;
    this.errorMessage = '';

    // TODO: Implement social registration
    this.authService.socialLogin(provider).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage =
          error.message || 'An error occurred during social registration';
      },
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.submitting = true;
      this.errorMessage = '';

      const { firstName, lastName, email, password } = this.registerForm.value;

      this.authService
        .register(firstName, lastName, email, password)
        .subscribe({
          next: () => {
            this.router.navigate(['/auth/login'], {
              queryParams: { registered: true },
            });
          },
          error: (error) => {
            this.submitting = false;
            this.errorMessage =
              error.message || 'An error occurred during registration';
          },
        });
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
