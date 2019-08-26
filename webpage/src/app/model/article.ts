import {Metadata} from "./metadata";
import {ArticleDependencies} from "./article-dependencies";

export interface Article extends ArticleDependencies {
  metadata?: Metadata;
  content?: string;
}
