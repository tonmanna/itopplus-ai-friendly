import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Create Article</h1>
        <p class="text-gray-600 mt-2">
          Share your knowledge about AI-friendly web development.
        </p>
      </div>

      <form [formGroup]="articleForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Title -->
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            [class.border-red-500]="isFieldInvalid('title')"
          />
          <p *ngIf="isFieldInvalid('title')" class="mt-1 text-sm text-red-600">
            Title is required and must be at least 5 characters long
          </p>
        </div>

        <!-- Summary -->
        <div>
          <label
            for="summary"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Summary
          </label>
          <textarea
            id="summary"
            formControlName="summary"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            [class.border-red-500]="isFieldInvalid('summary')"
          ></textarea>
          <p
            *ngIf="isFieldInvalid('summary')"
            class="mt-1 text-sm text-red-600"
          >
            Summary is required and must be at least 10 characters long
          </p>
        </div>

        <!-- Content -->
        <div>
          <label
            for="content"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            formControlName="content"
            rows="12"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            [class.border-red-500]="isFieldInvalid('content')"
          ></textarea>
          <p
            *ngIf="isFieldInvalid('content')"
            class="mt-1 text-sm text-red-600"
          >
            Content is required and must be at least 100 characters long
          </p>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Tags</label
          >
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              *ngFor="let tag of availableTags"
              (click)="toggleTag(tag)"
              [class.bg-blue-100]="selectedTags.includes(tag)"
              [class.text-blue-700]="selectedTags.includes(tag)"
              [class.bg-gray-100]="!selectedTags.includes(tag)"
              [class.text-gray-700]="!selectedTags.includes(tag)"
              class="px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {{ tag }}
            </button>
          </div>
          <p *ngIf="isFieldInvalid('tags')" class="mt-1 text-sm text-red-600">
            Please select at least one tag
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            (click)="navigateBack()"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="articleForm.invalid || submitting"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ submitting ? 'Creating...' : 'Create Article' }}
          </button>
        </div>
      </form>

      <!-- Success Alert -->
      <app-alert
        *ngIf="showSuccess"
        type="success"
        message="Article created successfully!"
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
  `,
  styles: [],
})
export class ArticleCreateComponent implements OnInit {
  articleForm: FormGroup;
  submitting = false;
  showSuccess = false;
  errorMessage = '';
  availableTags = [
    'AI',
    'SEO',
    'Web Development',
    'Best Practices',
    'Tips',
    'Performance',
  ];
  selectedTags: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(100)]],
      tags: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  isFieldInvalid(field: string): boolean {
    const formControl = this.articleForm.get(field);
    return formControl
      ? formControl.invalid && (formControl.dirty || formControl.touched)
      : false;
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.articleForm.patchValue({ tags: this.selectedTags });
    this.articleForm.get('tags')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.submitting = true;
      const articleData = {
        ...this.articleForm.value,
        createdAt: new Date(),
        author: 'Current User', // TODO: Get from auth service
      };

      // TODO: Implement API call to create article
      setTimeout(() => {
        this.submitting = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/articles']);
        }, 1500);
      }, 1000);
    } else {
      Object.keys(this.articleForm.controls).forEach((key) => {
        const control = this.articleForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/articles']);
  }
}
