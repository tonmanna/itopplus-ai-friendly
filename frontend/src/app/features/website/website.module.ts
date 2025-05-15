import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { WebsiteListComponent } from './components/website-list/website-list.component';
import { WebsiteAnalyzeComponent } from './components/website-analyze/website-analyze.component';
import { WebsiteDetailsComponent } from './components/website-details/website-details.component';
import { WebsiteHistoryComponent } from './components/website-history/website-history.component';

const routes: Routes = [
  { path: '', component: WebsiteListComponent },
  { path: 'analyze', component: WebsiteAnalyzeComponent },
  { path: 'history', component: WebsiteHistoryComponent },
  { path: ':id', component: WebsiteDetailsComponent },
];

@NgModule({
  declarations: [
    WebsiteListComponent,
    WebsiteAnalyzeComponent,
    WebsiteDetailsComponent,
    WebsiteHistoryComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class WebsiteModule {}
