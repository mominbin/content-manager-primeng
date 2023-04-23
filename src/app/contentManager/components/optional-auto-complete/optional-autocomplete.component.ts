import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from '../../api/type';

@Component({
    selector: 'cm-optional-autocomplete',
    templateUrl: './optional-autocomplete.component.html',
})
export class OptionalAutoCompleteComponent implements OnInit {
    @Input() folders!: ListItem[];
    sourceFileFolder: string = '';
    selectedFolder: ListItem | undefined;
    filteredFolders: any[] = [];
    constructor() {}
    @Output() listRetrived = new EventEmitter();

    ngOnInit() {}

    setSourceFolder() {
        if (!this.selectedFolder) {
            return;
        }
        this.sourceFileFolder = this.selectedFolder?.code as string;
    }

    filterFolders(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.folders.length; i++) {
            const item = this.folders[i];
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredFolders = filtered;
    }

    getFilelistByFolder() {
        if (!this.sourceFileFolder) {
            return;
        }
        if (!this.sourceFileFolder.endsWith('\\')) {
            this.sourceFileFolder = `${this.sourceFileFolder}\\`;
        }
        this.listRetrived.emit(this.sourceFileFolder);
    }
}
