import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex flex-col items-center justify-center py-12">
      <!-- Spinner -->
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
      ></div>

      <!-- Message -->
      <p *ngIf="message" class="mt-4 text-gray-600">{{ message }}</p>
    </div>
  `,
  styles: [],
})
export class LoadingSpinnerComponent {
  @Input() message?: string;
}
