import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResults } from '../core/models/search-results';

@Injectable()
export class SearchService {

    searchType: string;
    searchOffset: number;
    excludedIngredients: string;

    constructor(
        private http: HttpClient
    ) { }

    setType(type: string) {
        this.searchType = type;
        return this;
    }

    setOffset(skipIndex: number) {
        this.searchOffset = skipIndex;
        return this;
    }

    excludeIngredients(csvIngredients: string) {
        this.excludedIngredients = csvIngredients;
        return this;
    }

    searchQuery(searchValue: string): Observable<SearchResults> {
        const testerUri = "./assets/examples/example-searchresults-steak.json";
        const apiUri = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search" 
            + "?number=20" 
            + "&instructionsRequired=true" 
            // + "&limitLicense=true" // TODO: re-enable this if needed
            + ( !this.searchOffset ? "" : "&offset=" + this.searchOffset )
            + ( !this.searchType ? "" : "&type=" + this.searchType )
            + ( !this.excludedIngredients ? "" : "&excludeIngredients=" + this.excludedIngredients )
            + ( !searchValue ? "" : "&query=" + searchValue );
        return this.http.get<SearchResults>(apiUri);
    }

}
