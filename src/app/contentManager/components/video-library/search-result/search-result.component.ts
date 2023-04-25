import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoInfoResponse } from 'src/app/contentManager/api/type';
import {
    GlobalConstant,
    QueryType,
} from 'src/app/contentManager/enumerations/global.enum';
import { MediaInfoField } from 'src/app/contentManager/enumerations/mediaInfo.enum';
import { DataService } from 'src/app/contentManager/service/data.service';
import { VideoSearchService } from 'src/app/contentManager/service/video-search.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
    videoInfoField = MediaInfoField;
    formItem = GlobalConstant;
    tableList = [];
    payload: any;
    queryType: string = '';
    videoInfoArray: any[][] = [];
    pageNumber: number = 1;
    totalPage: number = 1;
    pageArray!: Array<any>;
    layout: string = 'list';
    videoListData: VideoInfoResponse = {
        data: {
            videoList: [],
            pageNumber: 0,
            totalPage: 0,
        },
    };
    hasRightExpression = false;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private videoSearchService: VideoSearchService
    ) {}

    ngOnInit() {
        this.checkUrlQuery();
        if (this.hasRightExpression) {
            return;
        }
        this.videoListData = this.videoSearchService.searchResult;
        if (this.videoListData) {
            // this.splitVideoInfo(this.videoListData);
            this.pageNumber = this.videoListData.data.pageNumber;
            this.totalPage = this.videoListData.data.totalPage;
            this.pageArray = new Array(this.totalPage);
            this.payload = this.videoSearchService.searchPayload;
        }
    }

    checkUrlQuery() {
        this.route.params.subscribe(async (params) => {
            const leftExpression = params[GlobalConstant.LEFT_EXPRESSION];
            const rightExpression = params[GlobalConstant.RIGHT_EXPRESSION];
            const pageNumber = params[GlobalConstant.PAGE_NUMBER];
            const hash = params[GlobalConstant.HASH];

            if (rightExpression) {
                this.queryType = QueryType.CONDITIONS;
                this.hasRightExpression = true;
                this.payload = {
                    conditions: [
                        {
                            [GlobalConstant.LOGIC]: '',
                            [GlobalConstant.LEFT_EXPRESSION]: leftExpression,
                            [GlobalConstant.OPERATOR]: 'is',
                            [GlobalConstant.RIGHT_EXPRESSION]: rightExpression,
                        },
                    ],
                    pageNumber: pageNumber,
                };
                this.videoListData = await this.getVideoInfo(this.payload);
                if (this.videoListData) {
                    this.splitVideoInfo(this.videoListData);
                }
            } else if (hash) {
                this.queryType = QueryType.HASH;
                this.payload = {
                    hashValue: hash,
                    pageNumber: pageNumber,
                };
                this.videoListData = await this.getVideoInfo(this.payload);
                if (this.videoListData) {
                    this.splitVideoInfo(this.videoListData);
                }
            }
        });
    }

    async getTableColumn(): Promise<any> {
        return await this.dataService.getTableFields();
    }

    async goToPage(pageNumber: number) {
        this.payload[this.formItem.PAGE_NUMBER] = pageNumber;
        let videoInfoData = await this.getVideoInfo(this.payload);
        this.splitVideoInfo(videoInfoData);
    }

    splitVideoInfo(videoInfoData: VideoInfoResponse) {
        this.videoInfoArray = this.splitArrayIntoChunks(
            videoInfoData.data.videoList,
            4
        );
        this.pageNumber = videoInfoData.data.pageNumber;
        this.totalPage = videoInfoData.data.totalPage;
        this.pageArray = new Array(this.totalPage);
    }

    setToPage(pageNumber: number) {
        this.goToPage(pageNumber);
    }

    splitArrayIntoChunks(array: any[], chunkSize: number): any[][] {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    async getVideoInfo(payload: object) {
        if (this.queryType === QueryType.CONDITIONS) {
            return await this.dataService.videoCustomizeSearch(payload);
        }

        if (this.queryType === QueryType.HASH) {
            return await this.dataService.getVideoInfoByHash(payload);
        }
    }

    async playVideo(item: any) {
        let payload = {
            video_id: item[MediaInfoField.VIDEO_PATH][0],
        };
        return await this.dataService.playVideo(payload);
    }
}
