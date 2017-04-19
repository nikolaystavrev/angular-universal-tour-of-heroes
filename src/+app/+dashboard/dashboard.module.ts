import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {HeroSearchModule} from "../+hero-search/hero-search.module";

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    HeroSearchModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
