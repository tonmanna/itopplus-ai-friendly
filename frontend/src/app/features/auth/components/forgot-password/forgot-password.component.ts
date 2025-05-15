import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p class="mt-2 text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <!-- Form -->
        <form
          [formGroup]="forgotPasswordForm"
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

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="forgotPasswordForm.invalid || submitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ submitting ? 'Sending...' : 'Send reset link' }}
          </button>

          <!-- Back to Login -->
          <div class="text-center">
            <a
              routerLink="/auth/login"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to login
            </a>
          </div>
        </form>

        <!-- Success Alert -->
        <app-alert
          *ngIf="showSuccess"
          type="success"
          message="Reset password link has been sent to your email address."
          [dismissible]="true"
          (dismissed)="showSuccess = false"
        >
        </app-alert>

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
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitting = false;
  showSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.forgotPasswordForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.submitting = true;
      this.errorMessage = '';
      this.showSuccess = false;

      const { email } = this.forgotPasswordForm.value;

      this.authService.forgotPassword(email).subscribe({
        next: () => {
          this.submitting = false;
          this.showSuccess = true;
          this.forgotPasswordForm.reset();
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage =
            error.message || 'An error occurred while sending the reset link';
        },
      });
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach((key) => {
        const control = this.forgotPasswordForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
