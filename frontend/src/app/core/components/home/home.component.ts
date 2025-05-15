import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="text-center py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Evaluate Your Website's AI-Friendliness
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Get instant insights into how well your website performs with AI systems
        and search engines.
      </p>
      <div class="space-x-4">
        <button
          *ngIf="!isAuthenticated()"
          (click)="navigateToLogin()"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <button
          *ngIf="isAuthenticated()"
          (click)="navigateToAnalyze()"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze Website
        </button>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div
              class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Comprehensive Scoring</h3>
            <p class="text-gray-600">
              Get detailed insights into your website's AI-friendliness with our
              scoring system.
            </p>
          </div>

          <div class="text-center p-6">
            <div
              class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Instant Analysis</h3>
            <p class="text-gray-600">
              Get immediate feedback on your website's performance and areas for
              improvement.
            </p>
          </div>

          <div class="text-center p-6">
            <div
              class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Actionable Insights</h3>
            <p class="text-gray-600">
              Receive practical recommendations to improve your website's AI
              compatibility.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-600 text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-3xl font-bold mb-4">
          Ready to improve your website's AI-friendliness?
        </h2>
        <p class="text-xl mb-8">
          Join thousands of websites that have already been analyzed and
          improved.
        </p>
        <button
          (click)="isAuthenticated() ? navigateToAnalyze() : navigateToLogin()"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Get Started Now
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToAnalyze(): void {
    this.router.navigate(['/websites/analyze']);
  }
}
