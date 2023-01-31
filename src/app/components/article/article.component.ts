import {Component, OnInit} from '@angular/core';
import {Article, ArticleApiService, Comment, CommentApiService} from "../../../../build/openapi";
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
                private articleApiService: ArticleApiService,
                private commentApiService: CommentApiService) {
    }

    ngOnInit(): void {
        this.commentForm = new FormGroup({comment: new FormControl("", [Validators.required])});

        this.refreshArticle();
    }

    private refreshArticle(): void {
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

    public deleteArticle(articleId: number): void {
        this.articleApiService.deleteArticle(articleId)
            .pipe(take(1))
            .subscribe(() => this.router.navigate(["/"]));
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
        return this.formatDate(this.article.createdAt ?? 0);
    }

    public commentContent(comment: Comment): string {
        return comment.content;
    }

    public commentAuthor(comment: Comment): string {
        return comment.author ?? "Unknown Author";
    }

    public commentDate(comment: Comment): string {
        return this.formatDateWithTime(comment.createdAt ?? 0);
    }

    public formatDate(value: string | number): string {
        const date = new Date(value);
        if (date.getMilliseconds() === new Date(0).getMilliseconds()) {
            return "Unknown Date";
        }
        return date.toLocaleDateString();
    }

    public formatDateWithTime(value: string | number): string {
        const date = new Date(value);
        if (date.getMilliseconds() === new Date(0).getMilliseconds()) {
            return "Unknown Date";
        }
        return date.toLocaleString();
    }

    get articleComments(): Comment[] {
        return this.article.comments?.sort((a, b) =>
            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()) ?? [];
    }

    public addComment(): void {
        this.article.comments?.unshift({
            id: this.article.comments.length,
            content: this.commentForm.value.comment
        });

        this.commentApiService.addComment(this.article.id!, this.commentForm.value.comment)
            .pipe(take(1))
            .subscribe(() => {
                this.commentForm.reset();
                this.refreshArticle();
            });
    }

    public deleteComment(id: number): void {
        this.commentApiService.deleteComment(id)
            .pipe(take(1))
            .subscribe(() => this.refreshArticle());
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

    get username(): String {
        return <String>this.authService.username;
    }
}
