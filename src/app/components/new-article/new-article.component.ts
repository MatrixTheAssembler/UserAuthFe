import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Article} from "../../../../build/openapi";

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit{
    public articleForm!: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.articleForm = new FormGroup({
            headLine: new FormControl(""),
            content: new FormControl("")
        });
    }

    public save(): void {
        const article: Article = {
            headLine: this.articleForm.value.headLine,
            content: this.articleForm.value.content
        }
    }
}
