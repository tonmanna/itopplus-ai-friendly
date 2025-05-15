import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-xl font-bold text-gray-800"
              >AI Friendly Score</a
            >
            <div class="hidden md:flex space-x-4">
              <a
                routerLink="/websites"
                class="text-gray-600 hover:text-gray-900"
                >Websites</a
              >
              <a
                routerLink="/articles"
                class="text-gray-600 hover:text-gray-900"
                >Articles</a
              >
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <ng-container
              *ngIf="!(authService.currentUser$ | async); else userMenu"
            >
              <a
                routerLink="/auth/login"
                class="text-gray-600 hover:text-gray-900"
                >Login</a
              >
              <a
                routerLink="/auth/register"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </a>
            </ng-container>

            <ng-template #userMenu>
              <div class="relative" #dropdown>
                <button
                  (click)="toggleDropdown()"
                  class="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <span>{{ (authService.currentUser$ | async)?.name }}</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  *ngIf="isDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                >
                  <a
                    routerLink="/profile"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >Profile</a
                  >
                  <button
                    (click)="logout()"
                    class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  isDropdownOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
