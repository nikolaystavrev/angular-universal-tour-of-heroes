import { Component, OnInit } from '@angular/core';
import {Hero} from "../shared/model/hero";
import {HeroService} from "../shared/hero.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

}
