import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageRefs } from '../shared/storage/storage-refs';
import { Bookmark } from '../core/models/bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get(StorageRefs.FAVORITES).then(favs => {
      this.bookmarks = favs;
    });
  }

}
