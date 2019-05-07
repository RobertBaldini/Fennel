import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { RecipeIndex } from '../core/models/recipe-index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    searchValue: string;
    recipeIndex: RecipeIndex[] = [] as RecipeIndex[];

    constructor(
        private searchService: SearchService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    goSearch() {
        if (!this.searchValue || this.searchValue.length < 1)
            return;

        console.log('goSearch: ' + this.searchValue);

        this.searchService.searchQuery(this.searchValue).subscribe(searchResults => {
            this.recipeIndex = searchResults.results;
        });
    }

    navigateToRecipe(recipeId: any) {
        this.router.navigateByUrl('/recipe/' + recipeId);
    }

}
