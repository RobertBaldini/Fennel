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

    ingredientImages = ["https://spoonacular.com/cdn/ingredients_100x100/yellow-bell-pepper.jpg",
        // "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
        // "https://spoonacular.com/cdn/ingredients_100x100/cooked-chicken-breast.png",
        "https://spoonacular.com/cdn/ingredients_100x100/fresh-basil.jpg",
        "https://spoonacular.com/cdn/ingredients_100x100/tomato-sauce-or-pasta-sauce.jpg",
        "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
    ];

    recipe: any = {};

    constructor(
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.recipeService.getExample().subscribe(data => {
            //console.log(data);
            this.recipe = data;
            this.recipe.extendedIngredients.forEach(ingred => console.log(ingred.name));
        });
    }

    stepHasAnyDisplayItems(step: Step) : boolean {
        var stepHasIngredients = step.ingredients && step.ingredients.length > 0;
        var stepHasEquipment = step.equipment && step.equipment.length > 0;
        var stepHasTime = !!step.length;
        return stepHasIngredients || stepHasEquipment || stepHasTime;
    }

    mapDisplayItemsForStep(step: Step) {
        var equipmentList = step.equipment.map(equip => ({ 
            name: equip.name, 
            image: "https://spoonacular.com/cdn/equipment_100x100/" + equip.image 
        }));
        var ingredientList = step.ingredients.map(ingred => ({ 
            name: ingred.name, 
            image: "https://spoonacular.com/cdn/ingredients_100x100/" + ingred.image 
        }));
        var combined = equipmentList.concat(ingredientList);
        return ingredientList;
    }

}
