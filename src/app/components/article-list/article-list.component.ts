import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Article} from "../../../../build/openapi";
import {DataService} from "../../services/data.service";
import {MockService} from "../../services/mock.service";

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
                private mockService: MockService) {
    }

    ngOnInit(): void {
        if (!this.authService.isUserLoggedIn) {
            this.router.navigate(["login"]);
        }

        this._articles = this.mockService.getArticles(10, 3);
    }

    get articles(): Article[]{
        return this._articles;
    }

    public refreshArticles(): void{
        //TODO: refresh Articles
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
