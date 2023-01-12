import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ArticleListComponent} from "./components/article-list/article-list.component";
import {RegisterComponent} from "./components/register/register.component";
import {ArticleComponent} from "./components/article/article.component";
import {NewArticleComponent} from "./components/new-article/new-article.component";
import {AdminConsoleComponent} from "./components/admin-console/admin-console.component";

const routes: Routes = [
    {path: "admin-console", component: AdminConsoleComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "article/:id", component: ArticleComponent},
    {path: "new-article", component: NewArticleComponent},
    {path: "", component: ArticleListComponent},
    {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
