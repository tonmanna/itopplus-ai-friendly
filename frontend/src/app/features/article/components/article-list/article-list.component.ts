import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  createdAt: Date;
  tags: string[];
  readTime: string;
}

@Component({
  selector: 'app-article-list',
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Articles</h1>
        <button
          *ngIf="isAuthenticated()"
          (click)="navigateToCreate()"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Write Article
        </button>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8">
        <div class="flex gap-4">
          <div class="flex-1">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearch()"
              placeholder="Search articles..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            [(ngModel)]="selectedTag"
            (ngModelChange)="onFilterByTag()"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            <option *ngFor="let tag of tags" [value]="tag">{{ tag }}</option>
          </select>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          *ngFor="let article of articles"
          class="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
          (click)="navigateToArticle(article.id)"
        >
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span>{{ article.readTime }} read</span>
              <span>•</span>
              <span>{{ article.createdAt | date }}</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              {{ article.title }}
            </h2>
            <p class="text-gray-600 mb-4">{{ article.summary }}</p>
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <span
                  *ngFor="let tag of article.tags"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
              <span class="text-sm text-gray-600">By {{ article.author }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Loading State -->
      <app-loading-spinner
        *ngIf="loading"
        [message]="'Loading articles...'"
      ></app-loading-spinner>

      <!-- Empty State -->
      <div *ngIf="!loading && articles.length === 0" class="text-center py-12">
        <p class="text-gray-600">No articles found.</p>
      </div>

      <!-- Pagination -->
      <div *ngIf="articles.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center gap-2">
          <button
            [disabled]="currentPage === 1"
            (click)="onPageChange(currentPage - 1)"
            class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span class="px-3 py-1"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
          <button
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(currentPage + 1)"
            class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  `,
  styles: [],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  searchTerm = '';
  selectedTag = '';
  currentPage = 1;
  totalPages = 1;
  tags: string[] = ['AI', 'SEO', 'Web Development', 'Best Practices', 'Tips'];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    // TODO: Implement API call to load articles
    this.loading = true;
    setTimeout(() => {
      this.articles = [
        {
          id: '1',
          title: 'How to Make Your Website AI-Friendly',
          summary:
            'Learn the best practices for optimizing your website for AI crawlers and search engines.',
          author: 'John Doe',
          createdAt: new Date(),
          tags: ['AI', 'SEO', 'Best Practices'],
          readTime: '5 min',
        },
        // Add more mock articles here
      ];
      this.loading = false;
    }, 1000);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateToCreate(): void {
    this.router.navigate(['/articles/create']);
  }

  navigateToArticle(id: string): void {
    this.router.navigate(['/articles', id]);
  }

  onSearch(): void {
    // TODO: Implement search functionality
    this.loadArticles();
  }

  onFilterByTag(): void {
    // TODO: Implement tag filtering
    this.loadArticles();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadArticles();
  }
}
