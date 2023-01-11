import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent{

    @Input()
    public headLine = "";

    @Input()
    public content = "";

    public getContent(): string{
        if(this.content.length > 250)
            return this.content.substring(0, 250) + "...";

        return this.content;
    }
}
