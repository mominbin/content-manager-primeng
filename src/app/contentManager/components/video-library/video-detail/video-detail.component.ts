import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaInfoField } from 'src/app/contentManager/enumerations/mediaInfo.enum';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-video-detail',
    templateUrl: './video-detail.component.html',
})
export class VideoDetailComponent implements OnInit {
    infoField = MediaInfoField;
    params: any;
    videoDetail: any;
    infoList: any[] = [];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(async (params) => {
            const videoLink = params[MediaInfoField.VIDEO_LINK];
            const result = await this.getVideoDetail(videoLink);
            this.videoDetail = result.data;
            this.buildList();
        });
    }

    buildList() {
        const valueArr = [
            MediaInfoField.VIDEO_ID,
            MediaInfoField.DATE,
            MediaInfoField.LENGTH,
            MediaInfoField.DIRECTOR,
            MediaInfoField.MAKER,
            MediaInfoField.LABEL,
            MediaInfoField.VIDEO_GENRES,
            MediaInfoField.VIDEO_CASTS,
        ];
        const labelArr = [
            '识别码:',
            '发行日期:',
            '长度:',
            '导演:',
            '制作商:',
            '发行商:',
            '类别:',
            '演员:',
        ];
        for (let [index, value] of valueArr.entries()) {
            let elData = {};
            if (
                value == MediaInfoField.VIDEO_CASTS ||
                value == MediaInfoField.VIDEO_GENRES
            ) {
                elData = {
                    label: labelArr[index],
                    children: this.splitBycomma(this.videoDetail[value], value),
                };
            } else {
                elData = {
                    label: labelArr[index],
                    value: this.videoDetail[value],
                    href: `#/videolibrary/searchresult/searchcondition/${value}/${this.videoDetail[value]}/1`,
                };
            }
            this.infoList.push(elData);
        }
    }

    splitBycomma(field: string, leftExpression: string) {
        let chips = field.split(',');
        let children: any[] = [];
        chips.forEach((chip) => {
            let child = {
                value: chip,
                href: `#/videolibrary/searchresult/searchcondition/${leftExpression}/${chip}/1`,
            };
            children.push(child);
        });
        return children;
    }

    async getVideoDetail(videoLink: string) {
        return await this.dataService.getVideoDetail(videoLink);
    }

    async playVideo(video_path: string) {
        let payload = {
            video_id: video_path,
        };
        return await this.dataService.playVideo(payload);
    }

    navigateTo(filePath: string) {
        this.router.navigate(['/splitVideoFromPath', filePath]);
    }
}
