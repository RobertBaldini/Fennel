import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    private searchValue: string;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
    }

    goSearch() {
        if (!this.searchValue || this.searchValue.length < 1)
            return;

        console.log('goSearch: ' + this.searchValue);
    }

}
