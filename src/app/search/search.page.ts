import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { RecipeIndex } from '../core/models/recipe-index';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';

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
        private storage: Storage
    ) { }

    ngOnInit() {
    }

    goSearch() {
        if (!this.searchValue || this.searchValue.length < 1)
            return;

        // console.log('goSearch: ' + this.searchValue);
        this.storage.get(StorageRefs.SEARCHES).then(history => {
            history = history || [];
            history.unshift(this.searchValue);
            let top100Truncated = history.slice(0, 100);
            history = top100Truncated;
            this.storage.set(StorageRefs.SEARCHES, history);
        });

        this.searchService.searchQuery(this.searchValue).subscribe(searchResults => {
            this.recipeIndex = searchResults.results;
        });
    }

}
