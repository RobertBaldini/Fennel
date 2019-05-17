import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: 'dinner',
    component: SearchPage,
    data: { searchType: 'Dinner' }
  },
  {
    path: 'lunch',
    component: SearchPage,
    data: { searchType: 'Lunch' }
  },
  {
    path: 'breakfast',
    component: SearchPage,
    data: { searchType: 'Breakfast' }
  },
  {
    path: 'appetizer',
    component: SearchPage,
    data: { searchType: 'Appetizer' }
  },
  {
    path: 'snacks',
    component: SearchPage,
    data: { searchType: 'Snacks' }
  },
  {
    path: 'dessert',
    component: SearchPage,
    data: { searchType: 'Dessert' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
