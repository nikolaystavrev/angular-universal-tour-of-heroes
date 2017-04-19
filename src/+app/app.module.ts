import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './+home/home.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';
import {HeroService} from "./shared/hero.service";
import {DashboardModule} from "./+dashboard/dashboard.module";
import {HeroesModule} from "./+heroes/heroes.module";
import {HeroDetailModule} from "./+hero-detail/hero-detail.module";
import {HeroSearchModule} from "./+hero-search/hero-search.module";

@NgModule({
  declarations: [ AppComponent, XLargeDirective ],
  imports: [
    SharedModule,
    HomeModule,
    DashboardModule,
    HeroesModule,
    HeroDetailModule,
    AboutModule,
    TodoModule,
    AppRoutingModule
  ],
  providers : [HeroService]
})
export class AppModule {}

export { AppComponent } from './app.component';
