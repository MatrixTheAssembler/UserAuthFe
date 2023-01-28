import {Component, OnInit} from '@angular/core';
import {Article, ArticleApiService, Comment} from "../../../../build/openapi";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    public commentForm!: FormGroup;

    private article: Article = {content: "", headline: ""};

    public page = 1;
    public pageSize = this.dataService.getPageSize();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private dataService: DataService,
                private authService: AuthService,
                private articleApiService: ArticleApiService) {
    }

    ngOnInit(): void {
        this.commentForm = new FormGroup({comment: new FormControl("", [Validators.required])});

        this.route.params.subscribe(params => {
            const id = +params["id"];

            if (!Number.isInteger(id))
                this.router.navigate(["404"])

            this.article.id = id;

            this.articleApiService.getArticle(id)
                .pipe(take(1))
                .subscribe({
                    next: article => this.article = article,
                    error: () => this.router.navigate(["404"])
                });
        });
    }

    get articleId(): number {
        return <number>this.article.id;
    }

    get articleHeadline(): string {
        return this.article.headline;
    }

    get articleContent(): string {
        return this.article.content;
    }

    get articleAuthor(): string {
        return this.article.author ?? "Unknown Author";
    }

    get articleDate(): string {
        const date = new Date(this.article.createdAt ?? 0);

        if (date.getMilliseconds() === new Date(0).getMilliseconds()) {
            return "Unknown Date";
        }
        return date.toLocaleDateString();
    }

    get articleComments(): Comment[] {
        return this.article.comments ?? [];
    }

    public addComment(): void {
        this.article.comments?.unshift({
            id: this.article.comments.length,
            content: this.commentForm.get("comment")?.value
        });

        this.commentForm.reset();
    }

    public setPageNumber(pageNumber: number): void {
        this.page = pageNumber;
    }

    public setPageSize(event: Event): void {
        this.pageSize = Number(event);
        this.dataService.savePageSize(this.pageSize);
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    get isModerator(): boolean {
        return this.authService.isModerator;
    }
}
