import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Article, ArticleApiService} from "../../../../build/openapi";
import {DataService} from "../../services/data.service";
import {take} from "rxjs";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    private _articles: Article[] = [];

    public page = 1;
    public pageSize = this.dataService.getPageSize();

    constructor(private router: Router,
                private authService: AuthService,
                private dataService: DataService,
                private articleApiService: ArticleApiService) {
    }

    ngOnInit(): void {
        this.articleApiService.getAllArticles()
            .pipe(take(1))
            .subscribe(articles => this._articles = articles);
    }

    get articles(): Article[]{
        return this._articles.sort((a, b) =>
            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    }

    public articleAuthor(article: Article): string {
        return article.author ?? "Unknown Author";
    }

    public articleDate(article: Article): string {
        const date = new Date(article.createdAt ?? 0);

        if(date.getTime() === new Date(0).getTime()){
            return "Unknown Date";
        }
        return date.toLocaleDateString();
    }

    public setPageNumber(pageNumber: number): void{
        this.page = pageNumber;
    }

    public setPageSize(event: Event): void{
        this.pageSize = Number(event);
        this.dataService.savePageSize(this.pageSize);
    }

    public getLimitedArticleContent(content: string): string{
        const contentLength = 250;
        const contentLengthPlusDots = contentLength + 3;

        if(content.length > contentLengthPlusDots)
            return content.substring(0, contentLength) + "...";

        return content;
    }
}
