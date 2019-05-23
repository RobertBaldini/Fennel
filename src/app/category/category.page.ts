import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';

import { CategoryHistory } from '../core/models/category-history';
import { RecipeReference } from '../core/models/recipe-reference';
import { SearchResults } from '../core/models/search-results';

import { SearchService } from '../search/search.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

    allCategoriesHistory = [] as CategoryHistory[];
    categoryHistory = new CategoryHistory();
    categoryType: string;
    searchResults = [] as RecipeReference[];

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.categoryType = this.route.snapshot.data.searchType;
    }

    ionViewDidEnter() {
        if (!this.categoryType) {
            console.log('category type not provided');
            return;
        }
        this.getNumberAlreadySeen().then(() => this.goSearch());
    }

    getNumberAlreadySeen() {
        // skip however many of this category that
        // the user has already scrolled through
        return this.storage.get(StorageRefs.CATEGORIES).then((categories: CategoryHistory[]) => {
            this.allCategoriesHistory = categories || [];
            let currentCategory = this.allCategoriesHistory.find(c => c.categoryType == this.categoryType);
            if (currentCategory) {
                this.categoryHistory = currentCategory;
                return;
            }
            this.categoryHistory = new CategoryHistory();
            this.categoryHistory.categoryType = this.categoryType;
            this.allCategoriesHistory.push(this.categoryHistory);
        });
    }

    goSearch() {
        this.searchService
            .setType(this.categoryType)
            .setOffset(this.categoryHistory.maxNumberSeen);

        this.searchService.searchQuery(null).subscribe((searchResults: SearchResults) => {
            this.searchResults = searchResults.results;
            let incrementAmount = this.searchResults.length;
            this.incrementNumberSeen(incrementAmount);
        });
    }

    incrementNumberSeen(incrementAmount: number) {
        this.categoryHistory.maxNumberSeen += incrementAmount;
        //let currentCategory = this.allCategoriesHistory.find(c => c.categoryType == this.categoryType);
        this.storage.set(StorageRefs.CATEGORIES, this.allCategoriesHistory);
    }

}
