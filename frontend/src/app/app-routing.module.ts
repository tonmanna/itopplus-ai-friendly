import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'websites',
    loadChildren: () =>
      import('./features/website/website.module').then((m) => m.WebsiteModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./features/article/article.module').then((m) => m.ArticleModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
