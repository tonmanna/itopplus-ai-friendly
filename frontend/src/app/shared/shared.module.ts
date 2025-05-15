import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { ScoreBadgeComponent } from './components/score-badge/score-badge.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    ScoreBadgeComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    AlertComponent,
    ScoreBadgeComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
