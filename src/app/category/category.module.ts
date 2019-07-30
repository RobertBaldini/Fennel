import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: 'dinner',
    component: CategoryPage,
    data: { searchType: 'Dinner' }
  },
  {
    path: 'lunch',
    component: CategoryPage,
    data: { searchType: 'Lunch' }
  },
  {
    path: 'breakfast',
    component: CategoryPage,
    data: { searchType: 'Breakfast' }
  },
  // {
  //   path: 'appetizer',
  //   component: CategoryPage,
  //   data: { searchType: 'Appetizer' }
  // },
  {
    path: 'snacks',
    component: CategoryPage,
    data: { searchType: 'Snacks' }
  },
  {
    path: 'salad',
    component: CategoryPage,
    data: { searchType: 'Salad' }
  },
  {
    path: 'dessert',
    component: CategoryPage,
    data: { searchType: 'Dessert' }
  },
  {
    path: 'drink',
    component: CategoryPage,
    data: { searchType: 'Drinks' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
