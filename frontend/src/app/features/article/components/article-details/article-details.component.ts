import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  tags: string[];
  readTime: string;
}

@Component({
  selector: 'app-article-details',
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <app-loading-spinner
        *ngIf="loading"
        [message]="'Loading article...'"
      ></app-loading-spinner>

      <!-- Article Content -->
      <article *ngIf="!loading && article">
        <!-- Header -->
        <header class="mb-8">
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{{ article.readTime }} read</span>
            <span>•</span>
            <span>{{ article.createdAt | date }}</span>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ article.title }}
          </h1>
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <span
                *ngFor="let tag of article.tags"
                class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <span class="text-gray-600">By {{ article.author }}</span>
          </div>
        </header>

        <!-- Actions -->
        <div *ngIf="isAuthor" class="flex gap-4 mb-8">
          <button
            (click)="navigateToEdit()"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit Article
          </button>
          <button
            (click)="deleteArticle()"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Article
          </button>
        </div>

        <!-- Content -->
        <div class="prose max-w-none">
          {{ article.content }}
        </div>
      </article>

      <!-- Error State -->
      <div *ngIf="!loading && !article" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
        <p class="text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <button
          (click)="navigateToList()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Articles
        </button>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        *ngIf="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Delete Article</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete this article? This action cannot be
            undone.
          </p>
          <div class="flex justify-end gap-4">
            <button
              (click)="showDeleteModal = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              (click)="confirmDelete()"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  loading = true;
  showDeleteModal = false;
  isAuthor = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(id);
    } else {
      this.navigateToList();
    }
  }

  loadArticle(id: string): void {
    // TODO: Implement API call to load article
    this.loading = true;
    setTimeout(() => {
      this.article = {
        id,
        title: 'How to Make Your Website AI-Friendly',
        content: 'Lorem ipsum dolor sit amet...',
        author: 'John Doe',
        createdAt: new Date(),
        tags: ['AI', 'SEO', 'Best Practices'],
        readTime: '5 min',
      };
      // TODO: Check if current user is the author
      this.isAuthor = true;
      this.loading = false;
    }, 1000);
  }

  navigateToEdit(): void {
    if (this.article) {
      this.router.navigate(['/articles', this.article.id, 'edit']);
    }
  }

  navigateToList(): void {
    this.router.navigate(['/articles']);
  }

  deleteArticle(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.article) {
      // TODO: Implement API call to delete article
      setTimeout(() => {
        this.showDeleteModal = false;
        this.navigateToList();
      }, 1000);
    }
  }
}
