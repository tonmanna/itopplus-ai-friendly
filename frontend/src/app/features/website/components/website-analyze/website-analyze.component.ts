import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsiteService } from '../../../../core/services/website.service';

@Component({
  selector: 'app-website-analyze',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Analyze Website</h1>
          <p class="mt-2 text-gray-600">
            Enter a website URL to analyze its AI-friendliness and get detailed
            metrics
          </p>
        </div>

        <!-- Analysis Form -->
        <form
          [formGroup]="analyzeForm"
          (ngSubmit)="onSubmit()"
          class="space-y-6"
        >
          <!-- URL Input -->
          <div>
            <label
              for="url"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Website URL
            </label>
            <div class="mt-1 flex rounded-lg shadow-sm">
              <span
                class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                https://
              </span>
              <input
                type="text"
                id="url"
                formControlName="url"
                placeholder="example.com"
                class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="isFieldInvalid('url')"
              />
            </div>
            <p *ngIf="isFieldInvalid('url')" class="mt-1 text-sm text-red-600">
              Please enter a valid URL
            </p>
          </div>

          <!-- Analysis Options -->
          <div class="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Analysis Options</h3>

            <!-- Checkboxes -->
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="performance"
                    type="checkbox"
                    formControlName="performance"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3">
                  <label for="performance" class="font-medium text-gray-700"
                    >Performance Analysis</label
                  >
                  <p class="text-gray-500 text-sm">
                    Check website loading speed and performance metrics
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="accessibility"
                    type="checkbox"
                    formControlName="accessibility"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3">
                  <label for="accessibility" class="font-medium text-gray-700"
                    >Accessibility Check</label
                  >
                  <p class="text-gray-500 text-sm">
                    Evaluate website accessibility standards
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="seo"
                    type="checkbox"
                    formControlName="seo"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3">
                  <label for="seo" class="font-medium text-gray-700"
                    >SEO Analysis</label
                  >
                  <p class="text-gray-500 text-sm">
                    Check search engine optimization factors
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="aiReadiness"
                    type="checkbox"
                    formControlName="aiReadiness"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3">
                  <label for="aiReadiness" class="font-medium text-gray-700"
                    >AI Readiness</label
                  >
                  <p class="text-gray-500 text-sm">
                    Evaluate compatibility with AI crawlers and tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-4">
            <button
              type="button"
              (click)="navigateBack()"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="analyzeForm.invalid || submitting"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
            >
              <span>{{ submitting ? 'Analyzing...' : 'Start Analysis' }}</span>
              <span *ngIf="submitting" class="animate-spin">⟳</span>
            </button>
          </div>
        </form>

        <!-- Analysis Progress -->
        <div *ngIf="analyzing" class="mt-8">
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Analysis in Progress
            </h3>

            <!-- Progress Steps -->
            <div class="space-y-4">
              <div
                *ngFor="let step of analysisSteps"
                class="flex items-center gap-3"
              >
                <span
                  [class]="getStepIconClass(step.status)"
                  class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                >
                  {{ getStepIcon(step.status) }}
                </span>
                <div class="flex-grow">
                  <div class="font-medium text-gray-900">{{ step.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ step.description }}
                  </div>
                </div>
                <span [class]="getStepStatusClass(step.status)" class="text-sm">
                  {{ step.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

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
export class WebsiteAnalyzeComponent {
  analyzeForm: FormGroup;
  submitting = false;
  analyzing = false;
  errorMessage = '';

  analysisSteps = [
    {
      name: 'Website Validation',
      description: 'Checking if the website is accessible',
      status: 'pending',
    },
    {
      name: 'Performance Analysis',
      description: 'Measuring loading speed and performance metrics',
      status: 'pending',
    },
    {
      name: 'Accessibility Check',
      description: 'Evaluating accessibility standards compliance',
      status: 'pending',
    },
    {
      name: 'SEO Analysis',
      description: 'Analyzing search engine optimization factors',
      status: 'pending',
    },
    {
      name: 'AI Readiness Check',
      description: 'Evaluating compatibility with AI tools',
      status: 'pending',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private websiteService: WebsiteService
  ) {
    this.analyzeForm = this.fb.group({
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      performance: [true],
      accessibility: [true],
      seo: [true],
      aiReadiness: [true],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.analyzeForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  getStepIconClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'in_progress':
        return 'bg-blue-100 text-blue-600';
      case 'error':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  getStepIcon(status: string): string {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in_progress':
        return '⟳';
      case 'error':
        return '✕';
      default:
        return '○';
    }
  }

  getStepStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  onSubmit(): void {
    if (this.analyzeForm.valid) {
      this.submitting = true;
      this.analyzing = true;
      this.errorMessage = '';

      const { url, ...options } = this.analyzeForm.value;

      // Simulate analysis steps
      this.simulateAnalysis().then(() => {
        this.websiteService.analyzeWebsite(url, options).subscribe({
          next: (website) => {
            this.submitting = false;
            this.analyzing = false;
            this.router.navigate(['/websites', website.id]);
          },
          error: (error) => {
            this.submitting = false;
            this.analyzing = false;
            this.errorMessage =
              error.message || 'An error occurred during analysis';
          },
        });
      });
    } else {
      Object.keys(this.analyzeForm.controls).forEach((key) => {
        const control = this.analyzeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  // Simulate analysis progress for better UX
  private async simulateAnalysis(): Promise<void> {
    for (let i = 0; i < this.analysisSteps.length; i++) {
      this.analysisSteps[i].status = 'in_progress';
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.analysisSteps[i].status = 'completed';
    }
  }

  navigateBack(): void {
    this.router.navigate(['/websites']);
  }
}
