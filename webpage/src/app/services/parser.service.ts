import {Injectable} from '@angular/core';
import * as Remarkable from 'remarkable';
import * as hljs from 'highlight.js';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  private parser = new Remarkable({
      html: true,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'language-',
      linkify: true,
      typographer: true,
      quotes: '“”‘’',

      highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {
          }
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {
        }

        return ''; // use external default escaping
      }
    }
  );

  constructor() {
    hljs.initHighlightingOnLoad();
    hljs.configure({ tabReplace: '\t' });
  }

  parse(text: string): string {
    return this.parser.render(text);
  }
}
