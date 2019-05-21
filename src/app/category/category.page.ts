import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';

import { SearchService } from '../search/search.service';
import { CategoryHistory } from '../core/models/category-history';
import { SearchResults } from '../core/models/search-results';
import { RecipeReference } from '../core/models/recipe-reference';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

    categoryType: string;
    maxNumberTaken: number = 0;
    searchResults = [] as RecipeReference[];

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.categoryType = this.route.snapshot.data.searchType;
        if (!this.categoryType) {
            console.log('category type not provided');
            return;
        }

        // skip however many of this category that
        // the user has already scrolled through
        this.storage.get(StorageRefs.CATEGORY_INDEX).then(categoryHistory => {
            if (!categoryHistory)
                return;
            let currentCategory = categoryHistory.find(ch => ch.categoryType == this.categoryType);
            if (!currentCategory)
                return;
            this.maxNumberTaken = currentCategory.maxNumberSeen;
        });

        this.searchService
            .setType(this.categoryType)
            .setOffset(this.maxNumberTaken);

        this.searchService.searchQuery(null).subscribe(searchResults => {
            this.searchResults = searchResults.results;
            this.maxNumberTaken += this.searchResults.length;
        });
    }

}
