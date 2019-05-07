import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResults } from '../core/models/search-results';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(
        private http: HttpClient
    ) { }

    searchQuery(searchValue: string): Observable<SearchResults> {
        const testerUri = "./assets/examples/example-searchresults-steak.json";
        const apiUri = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search" 
            + "?number=100" 
            + "&offset=0" 
            + "&instructionsRequired=true" 
            + "&query=" + searchValue;
        return this.http.get<SearchResults>(apiUri);
    }

}
