import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Article, ArticleApiService} from "../../../../build/openapi";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-new-article',
    templateUrl: './new-article.component.html',
    styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
    public articleForm!: FormGroup;

    constructor(private router: Router,
                private articleApiService: ArticleApiService) {
    }

    ngOnInit(): void {
        this.articleForm = new FormGroup({
            headline: new FormControl(""),
            content: new FormControl("")
        });
    }

    public save(): void {
        const article: Article = {
            headline: this.articleForm.value.headline,
            content: this.articleForm.value.content
        }

        this.articleApiService.createArticle(article)
            .pipe(take(1))
            .subscribe(() => {
                this.articleForm.reset();
                this.router.navigate(["/"]);
            });
    }
}
