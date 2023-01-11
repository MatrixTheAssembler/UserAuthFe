import {Component, OnInit} from '@angular/core';
import {Article} from "../../../../build/openapi";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    private article: Article = {content: "", headLine: ""};

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params["id"];

            if(!Number.isInteger(id))
                this.router.navigate(["404"])

            this.article.id = id;
        });
    }

    get articleId(): number{
        return <number>this.article.id;
    }
}
