import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from '../../../../core/services/website.service';

interface Website {
  id: string;
  url: string;
  score: number;
  status: 'pending' | 'analyzed' | 'error';
  lastAnalyzed: Date | null;
  badge: 'red' | 'yellow' | 'green';
  metrics: {
    loadTime: number;
    accessibility: number;
    seoScore: number;
    performance: number;
    aiReadiness: number;
  };
}

@Component({
  selector: 'app-website-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Analyzed Websites</h1>
          <p class="mt-2 text-gray-600">
            View and manage your website analysis results
          </p>
        </div>
        <button
          (click)="navigateToAnalyze()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Analyze New Website
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label
              for="search"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Search URL
            </label>
            <input
              type="text"
              id="search"
              [(ngModel)]="searchTerm"
              (ngModelChange)="filterWebsites()"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label
              for="status"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              [(ngModel)]="selectedStatus"
              (ngModelChange)="filterWebsites()"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="analyzed">Analyzed</option>
              <option value="error">Error</option>
            </select>
          </div>

          <!-- Score Range -->
          <div>
            <label
              for="scoreRange"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Minimum Score
            </label>
            <input
              type="range"
              id="scoreRange"
              [(ngModel)]="minScore"
              (ngModelChange)="filterWebsites()"
              min="0"
              max="100"
              class="w-full"
            />
            <div class="text-sm text-gray-600 mt-1">{{ minScore }}+</div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <app-loading-spinner
        *ngIf="loading"
        [message]="'Loading websites...'"
      ></app-loading-spinner>

      <!-- Website List -->
      <div *ngIf="!loading" class="space-y-4">
        <div
          *ngFor="let website of filteredWebsites"
          class="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
          (click)="navigateToDetails(website.id)"
        >
          <div class="flex items-start justify-between">
            <!-- Website Info -->
            <div class="flex-grow">
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ website.url }}
                </h3>
                <app-score-badge
                  [score]="website.score"
                  [badge]="website.badge"
                ></app-score-badge>
                <span
                  [class]="getStatusClass(website.status)"
                  class="px-2 py-1 text-xs rounded-full"
                >
                  {{ website.status }}
                </span>
              </div>

              <!-- Metrics -->
              <div
                *ngIf="website.status === 'analyzed'"
                class="mt-3 grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                <div class="text-sm">
                  <span class="text-gray-600">Load Time:</span>
                  <span class="ml-1 font-medium"
                    >{{ website.metrics.loadTime }}s</span
                  >
                </div>
                <div class="text-sm">
                  <span class="text-gray-600">Accessibility:</span>
                  <span class="ml-1 font-medium"
                    >{{ website.metrics.accessibility }}%</span
                  >
                </div>
                <div class="text-sm">
                  <span class="text-gray-600">SEO Score:</span>
                  <span class="ml-1 font-medium"
                    >{{ website.metrics.seoScore }}%</span
                  >
                </div>
                <div class="text-sm">
                  <span class="text-gray-600">Performance:</span>
                  <span class="ml-1 font-medium"
                    >{{ website.metrics.performance }}%</span
                  >
                </div>
                <div class="text-sm">
                  <span class="text-gray-600">AI Readiness:</span>
                  <span class="ml-1 font-medium"
                    >{{ website.metrics.aiReadiness }}%</span
                  >
                </div>
              </div>
            </div>

            <!-- Last Analyzed -->
            <div class="text-sm text-gray-500">
              {{
                website.lastAnalyzed
                  ? (website.lastAnalyzed | date : 'medium')
                  : 'Not analyzed yet'
              }}
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          *ngIf="filteredWebsites.length === 0"
          class="text-center py-8 text-gray-500"
        >
          No websites found matching your criteria
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
  `,
  styles: [],
})
export class WebsiteListComponent implements OnInit {
  websites: Website[] = [];
  filteredWebsites: Website[] = [];
  loading = true;
  errorMessage = '';

  // Filters
  searchTerm = '';
  selectedStatus = '';
  minScore = 0;

  constructor(private websiteService: WebsiteService, private router: Router) {}

  ngOnInit(): void {
    this.loadWebsites();
  }

  loadWebsites(): void {
    this.loading = true;
    this.errorMessage = '';

    this.websiteService.getWebsites().subscribe({
      next: (websites) => {
        this.websites = websites;
        this.filterWebsites();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.message || 'An error occurred while loading websites';
      },
    });
  }

  filterWebsites(): void {
    this.filteredWebsites = this.websites.filter((website) => {
      const matchesSearch = this.searchTerm
        ? website.url.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus = this.selectedStatus
        ? website.status === this.selectedStatus
        : true;

      const matchesScore = website.score >= this.minScore;

      return matchesSearch && matchesStatus && matchesScore;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  navigateToAnalyze(): void {
    this.router.navigate(['/websites/analyze']);
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/websites', id]);
  }
}
