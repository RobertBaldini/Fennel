import { Bookmark } from '../core/models/bookmark';
import { StorageRefs } from '../shared/storage/storage-refs';

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    historyTop4: string[];
    bookmarksTop3: Bookmark[];
    bookmarkCount: number;

    constructor(
        private storage: Storage
    ) { }

    ngOnInit() {
        this.storage.get(StorageRefs.FAVORITES)
            .then(favs => {
                this.bookmarkCount = (favs || []).length;
                this.bookmarksTop3 = (favs || []).slice(0, 3);
            });

        this.storage.get(StorageRefs.SEARCHES).then(history => {
            history = history || [];
            let top4 = history.slice(0, 4);
            this.historyTop4 = top4;
        })
    }

}
