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

    searchType: string;
    searchValue: string;
    title: string;

    recipeReferences: RecipeIndex[] = [] as RecipeIndex[];

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.searchType = this.route.snapshot.data.searchType;
        this.searchValue = this.route.snapshot.params.searchValue;

        this.title = this.searchType || "Search";

        console.log(this.searchType);
        console.log(this.searchValue);

        if (this.searchType)
            this.goSearch();

        if (this.searchValue && this.searchValue.length > 1)
            this.goSearch();
    }

    goSearch() {
        this.logSearch();

        this.searchService.setType(this.searchType).searchQuery(this.searchValue).subscribe(searchResults => {
            this.recipeReferences = searchResults.results;
        });
    }

    logSearch() {
        if (!this.searchValue || this.searchValue.length < 1)
            return;

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
