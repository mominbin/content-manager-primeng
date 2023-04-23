import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent {
    @Input() model!: any[];

    constructor(public layoutService: LayoutService) {}
}
