import {Injectable} from '@angular/core';
import {Metadata} from "../model/metadata";
import {HttpClient} from "@angular/common/http";
import {ArticleDependencies} from "../model/article-dependencies";
import {Article} from "../model/article";


const BASE_URI = 'data';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private articles: {
    [topic: string]: Array<Article>
  } = {};

  constructor(private httpClient: HttpClient) {
  }

  async getArticleIds(topic: string): Promise<Array<string>> {
    await this.loadArticleDependenciesOfTopic(topic);
    return this.articles[topic].map(a => a.id);
  }

  async getArticle(topic: string, id: string): Promise<Article> {
    await this.loadArticleDependenciesOfTopic(topic);
    await this.loadArticle(topic, id);
    return this.articles[topic].find(a => a.id == id);
  }

  private async loadArticle(topic: string, id: string): Promise<void> {
    await this.loadArticleDependenciesOfTopic(topic);
    const article = this.articles[topic].find(a => a.id === id);
    if (!article.hasOwnProperty('metadata')) {
      article.metadata = await this.httpClient.get<Metadata>(
        `${BASE_URI}/${topic}/${id}/metadata.json`).toPromise();
    }
    if (!article.hasOwnProperty('content')) {
      article.content = await this.httpClient.get<string>(
        `${BASE_URI}/${topic}/${id}/body.md`, {
          // @ts-ignore
          responseType: 'text'
        }).toPromise();
    }
  }

  private async loadArticleDependenciesOfTopic(topic: string): Promise<void> {
    if (!this.articles[topic]) {
      this.articles[topic] = await this.httpClient.get<Array<ArticleDependencies>>(
        `${BASE_URI}/${topic}/articles.json`).toPromise();
    }
  }
}
