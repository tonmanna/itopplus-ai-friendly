import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-badge',
  template: `
    <div
      class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium"
      [class]="getBadgeClasses()"
    >
      <span>{{ score }}</span>
      <span class="w-2 h-2 rounded-full" [class]="getDotClass()"></span>
    </div>
  `,
  styles: [],
})
export class ScoreBadgeComponent {
  @Input() score = 0;
  @Input() badge: 'red' | 'yellow' | 'green' = 'red';

  getBadgeClasses(): string {
    switch (this.badge) {
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getDotClass(): string {
    switch (this.badge) {
      case 'red':
        return 'bg-red-400';
      case 'yellow':
        return 'bg-yellow-400';
      case 'green':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  }
}
