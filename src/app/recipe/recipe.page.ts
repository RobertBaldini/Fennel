import { Component, OnInit } from '@angular/core';
import { Recipe } from '../core/models/recipe';
import { RecipeService } from './recipe.service';
import { Step } from '../core/models/step';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

    recipeId: number;
    recipe: Recipe = {} as Recipe;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.recipeId = +this.route.snapshot.paramMap.get('id');

        console.log(this.recipeId);

        if (this.recipeId <= 0) {
            this.recipeService.getExample().subscribe(result => {
                this.recipe = result;
                // this.recipe.extendedIngredients.forEach(ingred => console.log(ingred.name));
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

}
