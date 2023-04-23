import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/contentManager/api/type';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-merge-video',
    templateUrl: './merge-video.component.html',
})
export class MergeVideoComponent implements OnInit {
    sourceFileFolder: string = '';
    sourceFiles: any[] = [];
    folders: any[] = [];
    outputFileName = '';
    targetFiles: any[] = [];
    constructor(public dataService: DataService) {}

    ngOnInit() {
        this.folders = [
            { name: 'D:\\jav', code: 'D:\\jav' },
            { name: 'D:\\jav\\zzz', code: 'D:\\jav\\zzz' },
            { name: 'D:\\jav\\done', code: 'D:\\jav\\done' },
        ];
    }

    async getFileList(folder: string) {
        // remove target list
        this.targetFiles = [];
        // remove output name
        this.outputFileName = '';
        const response = await this.dataService.getFileList({
            filePath: folder,
        });
        const result = response.data.map((item: any) => ({
            name: item,
            code: item,
        }));
        this.sourceFiles = result;
    }

    async mergeVideo() {
        if (!this.sourceFileFolder) {
            return;
        }
        if (!this.sourceFileFolder.endsWith('\\')) {
            this.sourceFileFolder = `${this.sourceFileFolder}\\`;
        }
        const payload = {
            files: this.targetFiles.map(
                (item) => `${this.sourceFileFolder}${item.code}`
            ),
            outputFolder: this.sourceFileFolder,
            outputName: `${this.sourceFileFolder}${this.outputFileName}`,
        };

        if (!payload.files || !payload.outputFolder || !payload.outputName) {
        }
        await this.dataService.mergeVideo(payload);
    }

    setFiles() {
        this.targetFiles;
        if (this.targetFiles.length === 0) {
            this.outputFileName = '';
            return;
        }
        const fileName = this.targetFiles.map((item) => item.code)[0];
        const extensionIndex = fileName.lastIndexOf('.');
        const mergedFileName =
            fileName.slice(0, extensionIndex) +
            '_merged' +
            fileName.slice(extensionIndex);
        this.outputFileName = mergedFileName;
    }

    targetValueChanged(data: any) {
        this.setFiles();
    }
}
