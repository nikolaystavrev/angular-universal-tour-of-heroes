import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HeroesComponent} from "./heroes.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'heroes', component: HeroesComponent }
    ])
  ]
})
export class HeroesRoutingModule {}
