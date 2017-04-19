import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HeroDetailComponent} from "./hero-detail.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'detail/:id', component: HeroDetailComponent }
    ])
  ]
})
export class HeroDetailRoutingModule {}
