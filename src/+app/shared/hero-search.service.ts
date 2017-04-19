import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {HEROES} from "./model/mock-heroes";
import {Hero} from "./model/hero";

@Injectable()
export class HeroSearchService {

  constructor(
    private http: Http
  ) { }

  search(term: string): Observable<Hero[]> {
    let result = HEROES.filter(hero => hero.name.toLocaleLowerCase().indexOf(term) > -1);
    return Observable.of<Hero[]>(result)
  }

}
