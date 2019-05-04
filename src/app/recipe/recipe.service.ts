import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../core/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient
  ) { }

  getExample() : Observable<Recipe> {
    return this.http.get<Recipe>("./assets/example-recipe.json");
  }
}
