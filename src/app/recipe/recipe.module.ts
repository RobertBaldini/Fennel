import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecipePage } from './recipe.page';
import { TodoTargetComponent } from '../shared/components/todo-target/todo-target.component';

const routes: Routes = [
  {
    path: '',
    component: RecipePage
  },
  {
    path: ':id',
    component: RecipePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RecipePage,
    TodoTargetComponent
  ]
})
export class RecipePageModule {}
