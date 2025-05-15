import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-reset-password',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Reset your password</h2>
          <p class="mt-2 text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        <!-- Form -->
        <form
          [formGroup]="resetPasswordForm"
          (ngSubmit)="onSubmit()"
          class="mt-8 space-y-6"
        >
          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              New password
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
              Confirm new password
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

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="resetPasswordForm.invalid || submitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ submitting ? 'Resetting...' : 'Reset password' }}
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
          message="Your password has been reset successfully. You can now login with your new password."
          [dismissible]="true"
          (dismissed)="navigateToLogin()"
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
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitting = false;
  showSuccess = false;
  errorMessage = '';
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group(
      {
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
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.errorMessage = 'Invalid or expired reset token';
      setTimeout(() => this.navigateToLogin(), 3000);
    }
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.resetPasswordForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      this.submitting = true;
      this.errorMessage = '';
      this.showSuccess = false;

      const { password } = this.resetPasswordForm.value;

      this.authService.resetPassword(this.token, password).subscribe({
        next: () => {
          this.submitting = false;
          this.showSuccess = true;
          this.resetPasswordForm.reset();
          setTimeout(() => this.navigateToLogin(), 3000);
        },
        error: (error) => {
          this.submitting = false;
          this.errorMessage =
            error.message || 'An error occurred while resetting your password';
        },
      });
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach((key) => {
        const control = this.resetPasswordForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
