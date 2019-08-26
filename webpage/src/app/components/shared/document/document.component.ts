import {Component, Input} from '@angular/core';
import {ParserService} from "../../../services/parser.service";
import {DataService} from "../../../services/data.service";
import {Metadata} from "../../../model/metadata";
import {Article} from "../../../model/article";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  html: string;

  private _article: Article;
  @Input() set article(value: Article) {
    if (!value) {
      return;
    }

    this._article = value;
    this.html = this.parserService.parse(value.content);
  }

  get article(): Article {
    return this._article;
  }


  constructor(private parserService: ParserService) {
  }
}
