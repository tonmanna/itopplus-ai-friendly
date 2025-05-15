import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../../../../core/services/website.service';

interface HistoryEntry {
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
  selector: 'app-website-history',
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Analysis History</h1>
        <p class="mt-2 text-gray-600">
          View your website analysis history and track improvements over time
        </p>
      </div>

      <!-- Loading State -->
      <app-loading-spinner
        *ngIf="loading"
        [message]="'Loading analysis history...'"
      ></app-loading-spinner>

      <!-- History List -->
      <div *ngIf="!loading" class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow p-4">
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
                (ngModelChange)="filterHistory()"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Date Range -->
            <div>
              <label
                for="dateRange"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Date Range
              </label>
              <select
                id="dateRange"
                [(ngModel)]="selectedDateRange"
                (ngModelChange)="filterHistory()"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
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
                (ngModelChange)="filterHistory()"
                min="0"
                max="100"
                class="w-full"
              />
              <div class="text-sm text-gray-600 mt-1">{{ minScore }}+</div>
            </div>
          </div>
        </div>

        <!-- History Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Website
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Analyzed
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Metrics
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                *ngFor="let entry of filteredHistory"
                class="hover:bg-gray-50 transition cursor-pointer"
                (click)="navigateToDetails(entry.id)"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ entry.url }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <app-score-badge
                    [score]="entry.score"
                    [badge]="entry.badge"
                  ></app-score-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    [class]="getStatusClass(entry.status)"
                    class="px-2 py-1 text-xs rounded-full"
                  >
                    {{ entry.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ entry.lastAnalyzed | date : 'medium' }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-4">
                    <div
                      class="text-sm"
                      [title]="'Load Time: ' + entry.metrics.loadTime + 's'"
                    >
                      ⚡ {{ entry.metrics.loadTime }}s
                    </div>
                    <div
                      class="text-sm"
                      [title]="
                        'Accessibility: ' + entry.metrics.accessibility + '%'
                      "
                    >
                      ♿ {{ entry.metrics.accessibility }}%
                    </div>
                    <div
                      class="text-sm"
                      [title]="'SEO Score: ' + entry.metrics.seoScore + '%'"
                    >
                      🔍 {{ entry.metrics.seoScore }}%
                    </div>
                    <div
                      class="text-sm"
                      [title]="
                        'AI Readiness: ' + entry.metrics.aiReadiness + '%'
                      "
                    >
                      🤖 {{ entry.metrics.aiReadiness }}%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div
            *ngIf="filteredHistory.length === 0"
            class="text-center py-8 text-gray-500"
          >
            No analysis history found matching your criteria
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
  `,
  styles: [],
})
export class WebsiteHistoryComponent implements OnInit {
  history: HistoryEntry[] = [];
  filteredHistory: HistoryEntry[] = [];
  loading = true;
  errorMessage = '';

  // Filters
  searchTerm = '';
  selectedDateRange = 'all';
  minScore = 0;

  constructor(private websiteService: WebsiteService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading = true;
    this.errorMessage = '';

    this.websiteService.getHistory().subscribe({
      next: (history) => {
        this.history = history;
        this.filterHistory();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Failed to load analysis history';
      },
    });
  }

  filterHistory(): void {
    this.filteredHistory = this.history.filter((entry) => {
      const matchesSearch = this.searchTerm
        ? entry.url.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesScore = entry.score >= this.minScore;

      const matchesDate = this.filterByDate(entry.lastAnalyzed);

      return matchesSearch && matchesScore && matchesDate;
    });
  }

  filterByDate(date: Date | null): boolean {
    if (!date || this.selectedDateRange === 'all') return true;

    const analysisDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (this.selectedDateRange) {
      case 'today':
        return analysisDate >= today;
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return analysisDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setDate(now.getDate() - 30);
        return analysisDate >= monthAgo;
      default:
        return true;
    }
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

  navigateToDetails(id: string): void {
    window.location.href = `/websites/${id}`;
  }
}
