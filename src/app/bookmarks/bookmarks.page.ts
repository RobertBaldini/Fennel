import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';
import { Bookmark } from '../core/models/bookmark';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get(StorageRefs.FAVORITES).then(favs => {
      this.bookmarks = favs;
    });
  }

  navigateToRecipe(recipeId) {
    this.router.navigateByUrl('/recipe/' + recipeId);
  }

}
