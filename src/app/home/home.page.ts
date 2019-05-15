import { Bookmark } from '../core/models/bookmark';
import { StorageRefs } from '../shared/storage/storage-refs';

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    historyTop4 = [] as string[];
    bookmarksTop3 = [] as Bookmark[];
    bookmarkCount: number;

    constructor(
        private storage: Storage,
        private router: Router
    ) { }

    ngOnInit() {
    }

    // ngOnInit only fires on a fresh page load. 
    // This ionic lifecycle hook gets called every time.
    ionViewDidEnter() {
        this.refreshBookmarks();
        this.refreshSearches();
    }

    refreshBookmarks() {
        this.storage.get(StorageRefs.FAVORITES)
            .then(favs => {
                this.bookmarkCount = (favs || []).length;
                this.bookmarksTop3 = (favs || []).slice(0, 3);

                // redirect to search if there's nothing special to display on home
                if (this.bookmarksTop3.length == 0) {
                    this.router.navigateByUrl('/search');
                    return;
                }
            });
    }

    refreshSearches() {
        this.storage.get(StorageRefs.SEARCHES).then(history => {
            history = history || [];
            let top4 = history.slice(0, 4);
            this.historyTop4 = top4;
        });
    }

}
