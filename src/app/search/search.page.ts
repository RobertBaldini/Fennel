import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { RecipeIndex } from '../core/models/recipe-index';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    searchValue: string;
    recipeReferences: RecipeIndex[] = [] as RecipeIndex[];

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.searchValue = this.route.snapshot.paramMap.get('searchValue');

        this.goSearch();
    }

    goSearch() {
        if (!this.searchValue || this.searchValue.length < 1)
            return;

        this.logSearch();

        this.searchService.searchQuery(this.searchValue).subscribe(searchResults => {
            this.recipeReferences = searchResults.results;
        });
    }

    logSearch() {
        this.storage.get(StorageRefs.SEARCHES).then(history => {
            history = history || [];

            // ignore if this was already the most recent search
            if (history.length > 0 && history[0] == this.searchValue)
                return;

            history.unshift(this.searchValue);
            let top100Truncated = history.slice(0, 100);
            history = top100Truncated;
            this.storage.set(StorageRefs.SEARCHES, history);
        });
    }

}
