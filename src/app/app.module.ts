import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleListComponent} from './components/article-list/article-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './components/register/register.component';
import {AuthInterceptor} from "./interceptors/auth-interceptor.service";
import {HeaderComponent} from './components/header/header.component';
import {ArticleComponent} from './components/article/article.component';
import {NewArticleComponent} from './components/new-article/new-article.component';
import {AdminConsoleComponent} from './components/admin-console/admin-console.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ArticleListComponent,
    RegisterComponent,
    HeaderComponent,
    ArticleComponent,
    NewArticleComponent,
    AdminConsoleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
