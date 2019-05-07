import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../core/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient
  ) { }

  getExample(): Observable<Recipe> {
    const testerUri = "./assets/examples/example-recipe.json";
    return this.http.get<Recipe>(testerUri);
  }

  getRecipeById(recipeId: number): Observable<Recipe> {
    const apiUri = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
    return this.http.get<Recipe>(apiUri);
  }
}
