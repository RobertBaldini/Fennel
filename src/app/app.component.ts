import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Bookmarks',
            url: '/bookmarks',
            icon: 'heart'
        },
        {
            title: 'Timers',
            url: '/timers',
            icon: 'alarm'
        },
        {
            title: 'Shopping List',
            url: '/basket',
            icon: 'basket'
        },
        {
            title: 'Search',
            url: '/search',
            icon: 'search'
        },
        {
            title: 'Dinner',
            url: '/category/dinner',
            icon: 'restaurant'
        },
        {
            title: 'Lunch',
            url: '/category/lunch',
            icon: 'restaurant'
        },
        {
            title: 'Breakfast',
            url: '/category/breakfast',
            icon: 'restaurant'
        },
        {
            title: 'Appetizer',
            url: '/category/appetizer',
            icon: 'pizza'
        },
        {
            title: 'Snack Time',
            url: '/category/snacks',
            icon: 'nutrition'
        },
        {
            title: 'Dessert',
            url: '/category/dessert',
            icon: 'ice-cream'
        }

    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
