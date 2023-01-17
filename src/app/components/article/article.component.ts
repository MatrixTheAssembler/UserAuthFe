import {Component, OnInit} from '@angular/core';
import {Article, Comment} from "../../../../build/openapi";
import {ActivatedRoute, Router} from "@angular/router";
import {MockService} from "../../services/mock.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    public commentForm!: FormGroup;

    private article: Article = {content: "", headLine: ""};

    public page = 1;
    public pageSize = this.dataService.getPageSize();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private dataService: DataService,
                private authService: AuthService,
                private mockService: MockService) {
    }

    ngOnInit(): void {
        this.commentForm = new FormGroup({comment: new FormControl("", [Validators.required])});

        this.route.params.subscribe(params => {
            const id = +params["id"];

            if (!Number.isInteger(id))
                this.router.navigate(["404"])

            this.article.id = id;

            this.article = this.mockService.getArticle(id, 10);
        });
    }

    get articleId(): number {
        return <number>this.article.id;
    }

    get articleHeadLine(): string {
        return this.article.headLine;
    }

    get articleContent(): string {
        return this.article.content;
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

    public refreshComments(): void {
        //TODO: refresh Comments
    }

    public setPageNumber(pageNumber: number): void{
        this.page = pageNumber;
        this.refreshComments();
    }

    public setPageSize(event: Event): void{
        this.pageSize = Number(event);
        this.dataService.savePageSize(this.pageSize);
        this.refreshComments();
    }

    get isModerator(): boolean{
        return this.authService.isModerator;
    }
}
