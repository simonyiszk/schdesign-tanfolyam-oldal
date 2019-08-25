import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

declare global {
  interface String {
    codify: () => string;
  }
}

String.prototype.codify = function() {
  return this.split(/\r?\n/g)
    .slice(1, -1)
    .map(row => row.replace(/^\s*\|/g, ''))
    .join('\n');
};
