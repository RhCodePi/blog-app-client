import { Routes } from '@angular/router';
import { LoginComponent } from './ui/layout/login/login.component';
import { RegisterComponent } from './ui/layout/register/register.component';
import { ArticleComponent } from './ui/layout/article/article.component';
import { authGuard } from './guards/auth.guard';
import { CreateArticleComponent } from './ui/layout/article/create/create-article/create-article.component';
import { ListArticleComponent } from './ui/layout/article/list/list-article/list-article.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'article',
    component: ArticleComponent,
    children: [
        {path:"create", component: CreateArticleComponent, canActivate: [authGuard]},
        {path:"list", component: ListArticleComponent, canActivate: [authGuard]}
    ],
    canActivate: [authGuard],
  },
];
