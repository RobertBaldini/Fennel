import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
  }

}
