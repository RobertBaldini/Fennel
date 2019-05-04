import { Component, OnInit } from '@angular/core';
import { Recipe } from '../core/models/recipe';
import { RecipeService } from './recipe.service';
import { Step } from '../core/models/step';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.page.html',
    styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

    recipe: Recipe = {} as Recipe;

    constructor(
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.recipeService.getExample().subscribe(data => {
            this.recipe = data;
            // this.recipe.extendedIngredients.forEach(ingred => console.log(ingred.name));
        });
    }

    stepHasAnyDisplayItems(step: Step) : boolean {
        var stepHasIngredients = step.ingredients && step.ingredients.length > 0;
        var stepHasEquipment = step.equipment && step.equipment.length > 0;
        var stepHasTime = !!step.length;
        return stepHasIngredients || stepHasEquipment || stepHasTime;
    }

}
