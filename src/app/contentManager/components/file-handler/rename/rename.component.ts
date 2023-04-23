import { Component, OnInit } from '@angular/core';
import { RenamePayload } from 'src/app/contentManager/api/type';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-rename',
    templateUrl: './rename.component.html',
    styleUrls: ['./rename.component.scss'],
})
export class RenameComponent implements OnInit {
    folders = [];
    folder = '';
    files = [{ id: 0, name: 'aaa', newName: '' }];
    selectedFiles: any;
    sourceFiles: any[] = [];

    constructor(public dataService: DataService) {}

    ngOnInit() {}
    async getFileList(folder: string) {
        this.folder = folder;
        const response = await this.dataService.getFileList({
            filePath: folder,
        });
        const result = response.data.map((item: any) => ({
            name: item,
            code: item,
        }));
        this.sourceFiles = result;
    }
    getNewName(file: any) {}

    async rename(file: any) {
        const payload: RenamePayload = {
            path: this.folder,
            name: file.name,
            newName: file.newName,
        };
        // await this.dataService.rename(payload);
        const index = this.files.findIndex((val) => val.id === file.id);
        this.files[index].name = payload.newName;
    }
}
