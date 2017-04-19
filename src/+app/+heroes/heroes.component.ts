import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Hero} from "../shared/model/hero";
import {HeroService} from "../shared/hero.service";

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router:Router,
    private heroService:HeroService
  ) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes;
    });
  }

  ngOnInit() {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  onSelect(hero:Hero){
    this.selectedHero = hero;
  }

  add(name: string): void{
    name = name.trim();

    if(!name){
      return;
    }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero)
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h!== hero);
        if(this.selectedHero == hero){
          this.selectedHero = null;
        }
      })
  }


}
