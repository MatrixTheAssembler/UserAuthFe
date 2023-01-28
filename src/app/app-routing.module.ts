import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ArticleListComponent} from "./components/article-list/article-list.component";
import {RegisterComponent} from "./components/register/register.component";
import {ArticleComponent} from "./components/article/article.component";
import {NewArticleComponent} from "./components/new-article/new-article.component";
import {AdminConsoleComponent} from "./components/admin-console/admin-console.component";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import {AutorAuthGuard} from "./guards/autor-auth.guard";

const routes: Routes = [
    {path: "admin-console", component: AdminConsoleComponent, canActivate: [AdminAuthGuard]},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "article/:id", component: ArticleComponent},
    {path: "new-article", component: NewArticleComponent, canActivate: [AutorAuthGuard]},
    {path: "", component: ArticleListComponent},
    {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
