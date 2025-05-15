import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-website-details',
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <app-loading-spinner
        *ngIf="loading"
        [message]="'Loading website details...'"
      ></app-loading-spinner>

      <ng-container *ngIf="!loading && website">
        <!-- Header -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <div class="flex items-center gap-4">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ website.url }}
              </h1>
              <app-score-badge
                [score]="website.score"
                [badge]="website.badge"
              ></app-score-badge>
            </div>
            <p class="mt-2 text-gray-600">
              Last analyzed: {{ website.lastAnalyzed | date : 'medium' }}
            </p>
          </div>
          <div class="flex gap-3">
            <button
              (click)="reanalyze()"
              [disabled]="reanalyzing"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>{{ reanalyzing ? 'Reanalyzing...' : 'Reanalyze' }}</span>
              <span *ngIf="reanalyzing" class="animate-spin">⟳</span>
            </button>
            <button
              (click)="navigateBack()"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Back to List
            </button>
          </div>
        </div>

        <!-- Overall Score Card -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Overall Score</h2>
              <p class="text-gray-600">Based on multiple factors analysis</p>
            </div>
            <div class="text-5xl font-bold" [class]="getScoreTextColor()">
              {{ website.score }}/100
            </div>
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Load Time -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Load Time</h3>
                <p class="text-sm text-gray-500">Page loading speed</p>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ website.metrics.loadTime }}s
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  [style.width.%]="getLoadTimeScore()"
                ></div>
              </div>
            </div>
          </div>

          <!-- Accessibility -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Accessibility</h3>
                <p class="text-sm text-gray-500">WCAG compliance</p>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ website.metrics.accessibility }}%
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-600 h-2 rounded-full"
                  [style.width.%]="website.metrics.accessibility"
                ></div>
              </div>
            </div>
          </div>

          <!-- SEO Score -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">SEO Score</h3>
                <p class="text-sm text-gray-500">Search optimization</p>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ website.metrics.seoScore }}%
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-yellow-600 h-2 rounded-full"
                  [style.width.%]="website.metrics.seoScore"
                ></div>
              </div>
            </div>
          </div>

          <!-- AI Readiness -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">AI Readiness</h3>
                <p class="text-sm text-gray-500">AI crawler compatibility</p>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{ website.metrics.aiReadiness }}%
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-purple-600 h-2 rounded-full"
                  [style.width.%]="website.metrics.aiReadiness"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>

          <div class="space-y-6">
            <!-- Performance -->
            <div
              *ngIf="website.metrics.loadTime > 3"
              class="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg"
            >
              <div
                class="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
              >
                ⚡
              </div>
              <div>
                <h3 class="font-medium text-yellow-800">Improve Load Time</h3>
                <p class="text-yellow-700">
                  Your website's load time is above the recommended 3 seconds.
                  Consider optimizing images, minifying code, and leveraging
                  browser caching.
                </p>
              </div>
            </div>

            <!-- Accessibility -->
            <div
              *ngIf="website.metrics.accessibility < 90"
              class="flex items-start gap-4 p-4 bg-blue-50 rounded-lg"
            >
              <div
                class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
              >
                ♿
              </div>
              <div>
                <h3 class="font-medium text-blue-800">Enhance Accessibility</h3>
                <p class="text-blue-700">
                  Improve your website's accessibility by adding proper ARIA
                  labels, ensuring sufficient color contrast, and providing
                  alternative text for images.
                </p>
              </div>
            </div>

            <!-- SEO -->
            <div
              *ngIf="website.metrics.seoScore < 85"
              class="flex items-start gap-4 p-4 bg-green-50 rounded-lg"
            >
              <div
                class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
              >
                🔍
              </div>
              <div>
                <h3 class="font-medium text-green-800">Boost SEO</h3>
                <p class="text-green-700">
                  Enhance your search engine visibility by optimizing meta
                  descriptions, using semantic HTML, and improving content
                  structure.
                </p>
              </div>
            </div>

            <!-- AI Readiness -->
            <div
              *ngIf="website.metrics.aiReadiness < 80"
              class="flex items-start gap-4 p-4 bg-purple-50 rounded-lg"
            >
              <div
                class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
              >
                🤖
              </div>
              <div>
                <h3 class="font-medium text-purple-800">
                  Improve AI Compatibility
                </h3>
                <p class="text-purple-700">
                  Make your website more AI-friendly by implementing structured
                  data, improving content readability, and ensuring clear
                  information hierarchy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

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
export class WebsiteDetailsComponent implements OnInit {
  website: Website | null = null;
  loading = true;
  reanalyzing = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.loadWebsite(websiteId);
    } else {
      this.navigateBack();
    }
  }

  loadWebsite(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.websiteService.getWebsite(id).subscribe({
      next: (website) => {
        this.website = website;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Failed to load website details';
      },
    });
  }

  reanalyze(): void {
    if (!this.website) return;

    this.reanalyzing = true;
    this.errorMessage = '';

    this.websiteService
      .analyzeWebsite(this.website.url, {
        performance: true,
        accessibility: true,
        seo: true,
        aiReadiness: true,
      })
      .subscribe({
        next: (website) => {
          this.website = website;
          this.reanalyzing = false;
        },
        error: (error) => {
          this.reanalyzing = false;
          this.errorMessage = error.message || 'Failed to reanalyze website';
        },
      });
  }

  getScoreTextColor(): string {
    if (!this.website) return 'text-gray-900';

    if (this.website.score <= 60) {
      return 'text-red-600';
    } else if (this.website.score <= 80) {
      return 'text-yellow-600';
    } else {
      return 'text-green-600';
    }
  }

  getLoadTimeScore(): number {
    if (!this.website) return 0;
    // Convert load time to a percentage score (lower is better)
    // Assuming 5 seconds is 0% and 1 second is 100%
    const score = 100 - (this.website.metrics.loadTime - 1) * 25;
    return Math.max(0, Math.min(100, score));
  }

  navigateBack(): void {
    this.router.navigate(['/websites']);
  }
}
