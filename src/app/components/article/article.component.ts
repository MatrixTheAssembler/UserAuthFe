import {Component, OnInit} from '@angular/core';
import {Article, Comment} from "../../../../build/openapi";
import {ActivatedRoute, Router} from "@angular/router";
import {MockService} from "../../services/mock.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    public commentForm!: FormGroup;

    private article: Article = {content: "", headLine: ""};

    constructor(private router: Router,
                private route: ActivatedRoute,
                private mockService: MockService) {
    }

    ngOnInit(): void {
        this.commentForm = new FormGroup({comment: new FormControl("")});

        this.route.params.subscribe(params => {
            const id = +params["id"];

            if (!Number.isInteger(id))
                this.router.navigate(["404"])

            this.article.id = id;

            this.article = this.mockService.getArticle(id);
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
}
