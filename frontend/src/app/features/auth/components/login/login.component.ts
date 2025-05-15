import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p class="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <!-- Social Login Buttons -->
        <div class="space-y-3">
          <button
            (click)="socialLogin('google')"
            class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img src="assets/icons/google.svg" alt="Google" class="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            (click)="socialLogin('facebook')"
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
            (click)="socialLogin('microsoft')"
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
            <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Login Form -->
        <form
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
          class="mt-8 space-y-6"
        >
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
              Password is required
            </p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                formControlName="rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <a
              routerLink="/auth/forgot-password"
              class="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="loginForm.invalid || submitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ submitting ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <a
            routerLink="/auth/register"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
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
export class LoginComponent {
  loginForm: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  socialLogin(provider: 'google' | 'facebook' | 'microsoft'): void {
    this.submitting = true;
    this.errorMessage = '';

    // TODO: Implement social login
    this.authService.socialLogin(provider).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage =
          error.message || 'An error occurred during social login';
      },
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitting = true;
      this.errorMessage = '';

      const { email, password, rememberMe } = this.loginForm.value;

      this.authService.login(email, password, rememberMe).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage = error.message || 'Invalid email or password';
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
