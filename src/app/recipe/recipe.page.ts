import { Component, OnInit } from '@angular/core';
import { Recipe } from '../core/models/recipe';
import { RecipeService } from './recipe.service';
import { Step } from '../core/models/step';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Bookmark } from '../core/models/bookmark';
import { StorageRefs } from '../shared/storage/storage-refs';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

    recipe: Recipe = {} as Recipe;
    isFavorite = false;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        const recipeId = +this.route.snapshot.paramMap.get('id');

        if (recipeId <= 0) {
            this.recipeService.getExample().subscribe(result => this.loadRecipe(result));
            return;
        }

        this.recipeService.getRecipeById(recipeId).subscribe(result => this.loadRecipe(result));
    }

    loadRecipe(recipe: Recipe) {
        this.recipe = recipe;
        let id = recipe.id;
        this.storage.get(StorageRefs.FAVORITES).then(favs => {
            this.isFavorite = (favs || []).some(f => f.recipeId === id);
        });
    }

    stepHasAnyDisplayItems(step: Step): boolean {
        var stepHasIngredients = step.ingredients && step.ingredients.length > 0;
        var stepHasEquipment = step.equipment && step.equipment.length > 0;
        var stepHasTime = !!step.length;
        return stepHasIngredients || stepHasEquipment || stepHasTime;
    }

    toggleFavorite() {
        this.storage.get(StorageRefs.FAVORITES).then(favs => {
            favs = favs || [];
            const existingBookmarkIndex = favs.findIndex(f => f.recipeId === this.recipe.id);
            if (existingBookmarkIndex > -1) { 
                this.removeFavorite(favs, existingBookmarkIndex);
             }
             else
                this.addFavorite(favs);
        });
    }

    addFavorite(bookmarks) {
        let bookmark = {} as Bookmark;
        bookmark.recipeId = this.recipe.id;
        bookmark.title = this.recipe.title;
        bookmarks.push(bookmark);
        this.storage.set(StorageRefs.FAVORITES, bookmarks);
        this.isFavorite = true;
    }

    removeFavorite(bookarks, bookmarkIndex) {
        bookarks.splice(bookmarkIndex, 1);
        this.storage.set(StorageRefs.FAVORITES, bookarks);
        this.isFavorite = false;
    }

}
