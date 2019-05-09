import { Component, OnInit } from '@angular/core';
import { Recipe } from '../core/models/recipe';
import { RecipeService } from './recipe.service';
import { Step } from '../core/models/step';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Bookmark } from '../core/models/bookmark';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

    recipeId: number;
    recipe: Recipe = {} as Recipe;
    isFavorite = false;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.recipeId = +this.route.snapshot.paramMap.get('id');

        console.log(this.recipeId);

        if (this.recipeId <= 0) {
            this.recipeService.getExample().subscribe(result => {
                this.recipe = result;
                let id = this.recipeId = this.recipe.id;
                this.storage.get('favorites').then(favs => {
                    this.isFavorite = (favs || []).some(f => f.recipeId === id);
                });
            });
            return;
        }

        this.recipeService.getRecipeById(this.recipeId).subscribe(result => {
            this.recipe = result;
        });
    }

    stepHasAnyDisplayItems(step: Step): boolean {
        var stepHasIngredients = step.ingredients && step.ingredients.length > 0;
        var stepHasEquipment = step.equipment && step.equipment.length > 0;
        var stepHasTime = !!step.length;
        return stepHasIngredients || stepHasEquipment || stepHasTime;
    }

    toggleFavorite() {
        this.storage.get('favorites').then(favs => {
            favs = favs || [];
            const existingBookmarkIndex = favs.findIndex(f => f.recipeId === this.recipe.id);
            if (existingBookmarkIndex > -1) { 
                favs.splice(existingBookmarkIndex, 1);
                this.storage.set('favorites', favs);
                this.isFavorite = false;
                return;
             }
            let bookmark = {} as Bookmark;
            bookmark.recipeId = this.recipe.id;
            bookmark.title = this.recipe.title;
            favs.push(bookmark);
            this.storage.set('favorites', favs);
            this.isFavorite = true;
        });
    }

}
