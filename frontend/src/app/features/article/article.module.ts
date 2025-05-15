import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  {
    path: 'create',
    component: ArticleCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/edit',
    component: ArticleEditComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id', component: ArticleDetailsComponent },
];

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ArticleModule {}
