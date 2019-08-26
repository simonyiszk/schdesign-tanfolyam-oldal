import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {Article} from "../../../model/article";

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {

  openArticle: Article;
  private articleIds: Array<string>;

  constructor(private dataService: DataService) {
    this.init();
  }

  async init(): Promise<void> {
    this.articleIds = await this.dataService.getArticleIds('test');
    this.openArticle = await this.dataService.getArticle('test', this.articleIds[0]);
  }

  ngOnInit() {
  }

}
