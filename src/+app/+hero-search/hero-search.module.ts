import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {HeroSearchComponent} from "./hero-search.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeroSearchComponent
  ],
  exports : [
    HeroSearchComponent
  ]
})
export class HeroSearchModule { }
