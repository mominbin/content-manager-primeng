import { Component, OnInit } from '@angular/core';
import { RenamePayload, defaultFolder } from 'src/app/contentManager/api/type';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-rename',
    templateUrl: './rename.component.html',
    styleUrls: ['./rename.component.scss'],
})
export class RenameComponent implements OnInit {
    folders = defaultFolder;
    folder = '';
    selectedFiles: any;
    fileList = [];

    sourceFiles: any[] = [];

    constructor(public dataService: DataService) {}

    ngOnInit() {}
    async getFileList(folder: string) {
        this.folder = folder;
        const response = await this.dataService.getFileList({
            filePath: folder,
        });
        const result = response.data.map((item: any, index: number) => ({
            id: index,
            name: item,
            newName: item,
        }));
        console.log(result);
        this.fileList = response.data;
        this.sourceFiles = result;
    }
    async getNewName(file: any) {
        const currentFileName = file.name;
        const response = await this.dataService.getFormatedName({
            name: currentFileName,
        });
        file.newName = response.data;
    }

    async getCheckedFilesNewName() {
        const payload = {
            fileList: this.selectedFiles.map((file: any) => file.name),
        };
        const response = await this.dataService.getFilesNewName(payload);
        for (let i = 0, length = this.selectedFiles.length; i < length; i++) {
            this.selectedFiles[i].newName = response.data[i];
        }
    }

    async renameCheckedFiles() {
        const fileList = this.selectedFiles.map(function (file: any) {
            return { name: file.name, new_name: file.newName };
        });
        const payload = {
            path: this.folder,
            fileList: fileList,
        };
        await this.dataService.renameCheckedFiles(payload);
        for (let i = 0, length = this.selectedFiles.length; i < length; i++) {
            this.selectedFiles[i].name = this.selectedFiles[i].newName;
        }
    }

    async rename(file: any) {
        const payload: RenamePayload = {
            path: this.folder,
            name: file.name,
            newName: file.newName,
        };
        await this.dataService.rename(payload);
        file.name = file.newName;
    }
}
