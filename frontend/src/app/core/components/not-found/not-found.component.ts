import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div
      class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">Page not found</p>
      <p class="text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a
        routerLink="/"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  `,
  styles: [],
})
export class NotFoundComponent {}
