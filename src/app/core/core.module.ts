import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './models/recipe';
import { flatMap } from 'rxjs/operators';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class CoreModule {
    private recipe: Recipe;

    foo() {
        const instructions = this.recipe.analyzedInstructions;
        instructions.forEach(instruction => {
            const steps = instruction.steps;
        });
    }
}
