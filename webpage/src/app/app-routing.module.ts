import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./components/pages/index/index.component";
import {WebComponent} from "./components/pages/web/web.component";

const routes: Routes = [
  {
    path: 'web',
    component: WebComponent
  },
  {
    path: '**',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
