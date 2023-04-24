import { Component, OnInit } from '@angular/core';
import { ListItem, defaultFolder } from 'src/app/contentManager/api/type';
import { DataService } from 'src/app/contentManager/service/data.service';
@Component({
    selector: 'cm-split-video',
    templateUrl: './split-video.component.html',
})
export class SplitVideoComponent implements OnInit {
    mergeAfterSplit: boolean = true;
    maskString = '99:99:99';
    fileList: ListItem[] = [];
    selectedFolder: any;
    filteredName: any[] = [];
    videoFolder = '';
    selectedFile: ListItem | undefined;

    duratioins: any[] = [{ id: 0, start: '00:00:00', end: '00:00:00' }];

    selectedProducts: any;

    folders = defaultFolder;

    constructor(public dataService: DataService) {}

    ngOnInit() {}

    filterFolders(_event: any) {
        const filtered: any[] = [];
        const query = _event.query;
        for (let i = 0; i < this.fileList.length; i++) {
            const item = this.fileList[i];
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        this.filteredName = filtered;
    }

    async getFileList(folder: string) {
        this.videoFolder = folder;
        this.selectedFile = undefined;
        const response = await this.dataService.getFileList({
            filePath: folder,
        });
        const result = response.data.map((item: any) => ({
            name: item,
            code: item,
        }));
        this.fileList = result;
    }

    async playVideo() {
        let fileItem = this.selectedFile as ListItem;
        const fullPath = `${this.videoFolder}${fileItem.code}`;
        let payload = {
            video_id: fullPath,
        };
        return await this.dataService.playVideo(payload);
    }

    async cutVideo() {
        let fileItem = this.selectedFile as ListItem;
        console.log(this.duratioins);
        let duratioinsArray: any[] = this.duratioins.map(({ start, end }) => [
            start,
            end,
        ]);
        let payload = {
            inputFile: `${this.videoFolder}${fileItem.code}`,
            outFolder: this.videoFolder,
            durations: duratioinsArray,
        };
        console.log(payload);
        if (this.mergeAfterSplit) {
            await this.dataService.concentrateVideo(payload);
        } else {
            await this.dataService.spliteVideo(payload);
        }
    }

    deleteItem(duration: any) {
        this.duratioins = this.duratioins.filter(
            (val) => val.id !== duration.id
        );
    }
    deleteSelecteItem() {
        this.duratioins = this.duratioins.filter(
            (val) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
    }
    addDuration() {
        let index = this.duratioins.length;
        this.duratioins.push({ id: index, start: '00:00:00', end: '00:00:00' });
    }
}
