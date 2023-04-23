import { Component, ElementRef } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { Menus } from './api/menuchangeevent';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
    originMenu: any[] = [];
    contentManagerMenu: any[] = [];
    constructor(
        public layoutService: LayoutService,
        public el: ElementRef,
        public http: HttpClient
    ) {}
    ngOnInit() {
        this.http
            .get('../../assets/layout/menus/originMenu.json')
            .subscribe((data) => {
                const menus = data as Menus;
                this.originMenu = menus['origin'];
                this.contentManagerMenu = menus['contentManager'];
            });
    }
}
