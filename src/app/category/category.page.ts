import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { StorageRefs } from '../shared/storage/storage-refs';
import { CategoryHistory } from '../core/models/category-history';
import { RecipeReference } from '../core/models/recipe-reference';
import { SearchService } from '../search/search.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
    providers: [SearchService]
})
export class CategoryPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

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

    async ionViewDidEnter() {
        if (!this.categoryType) {
            console.log('category type not provided');
            return;
        }
        await this.goSearch();
    }

    async goSearch() {
        var searchOffset = await this.getNumberAlreadySeen();

        var searchCategory = this.categoryType
                                 .replace('Lunch', 'sandwich') // closest thing
                                 // API says 'main course' is correct, but it doesnt have as much
                                 //.replace('Dinner', 'main course') 
                                 .replace('Snacks', 'side dish')
                                 .replace('Drinks', 'drink')
                                 .toLowerCase();

        var excluded = (searchCategory === 'sandwich')
                        ? 'cookie,cookies,ice cream'
                        : null;

        this.searchService
            .setType(searchCategory)
            .setOffset(searchOffset)
            .excludeIngredients(excluded);

        let searchResult = await this.searchService.searchQuery(null).toPromise();
        if (!searchResult || !searchResult.results)
            return;
        var results = searchResult.results;
        results.forEach(result => this.searchResults.push(result));

        let incrementAmount = results.length;
        await this.incrementNumberSeen(incrementAmount);
    }

    async getNumberAlreadySeen() {
        // skip however many of this category that
        // the user has already scrolled through
        var categories = await this.storage.get(StorageRefs.CATEGORIES);
        this.allCategoriesHistory = categories || [];
        let currentCategory = this.allCategoriesHistory.find(c => c.categoryType == this.categoryType);
        if (currentCategory) {
            this.categoryHistory = currentCategory;
            return this.categoryHistory.maxNumberSeen;
        }
        this.categoryHistory = new CategoryHistory();
        this.categoryHistory.categoryType = this.categoryType;
        this.allCategoriesHistory.push(this.categoryHistory);
        return 0;
    }

    async incrementNumberSeen(incrementAmount: number) {
        // offset limit is 900 max from the 3rd party api.
        // increment of 0 means we reached the end.
        if (this.categoryHistory.maxNumberSeen >= 880 || incrementAmount === 0)
            this.categoryHistory.maxNumberSeen = 0;
        else
            this.categoryHistory.maxNumberSeen += incrementAmount;
        //let currentCategory = this.allCategoriesHistory.find(c => c.categoryType == this.categoryType);
        await this.storage.set(StorageRefs.CATEGORIES, this.allCategoriesHistory);
    }

    async loadMore(event) {
        await this.goSearch();
        event.target.complete();
    }

}
