import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
    totalRecords: number = 120;
    layout: string = 'grid';
    videoListData: VideoInfoResponse = {
        data: {
            videoList: [],
            pageNumber: 0,
            totalRecords: 120,
        },
    };
    hasRightExpression = false;
    rows: number = 12;
    first: number = 1;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private videoSearchService: VideoSearchService,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkUrlQuery();
        if (this.hasRightExpression) {
            return;
        }
        this.videoListData = this.videoSearchService.searchResult;
        if (this.videoListData) {
            this.setPaginationInfo(this.videoListData);
            this.payload = this.videoSearchService.searchPayload;
        }
    }

    onPageChange(_event: any) {
        console.log(_event);
        this.first = _event.first;
        this.rows = _event.rows;
        this.setToPage(_event.page + 1);
    }

    checkUrlQuery() {
        this.route.params.subscribe(async (params) => {
            const leftExpression = params[GlobalConstant.LEFT_EXPRESSION];
            const rightExpression = params[GlobalConstant.RIGHT_EXPRESSION];
            const pageNumber = parseInt(params[GlobalConstant.PAGE_NUMBER]);
            const hash = params[GlobalConstant.HASH];
            console.log('check url query :', pageNumber);
            if (rightExpression) {
                this.queryType = QueryType.CONDITIONS;
                this.hasRightExpression = true;
                let operator = 'is';
                let newRightExpression = rightExpression;
                if (
                    leftExpression == MediaInfoField.VIDEO_CASTS ||
                    leftExpression === MediaInfoField.VIDEO_GENRES
                ) {
                    operator = 'like';
                    newRightExpression = `%${rightExpression}%`;
                }
                this.payload = {
                    conditions: [
                        {
                            [GlobalConstant.LOGIC]: '',
                            [GlobalConstant.LEFT_EXPRESSION]: leftExpression,
                            [GlobalConstant.OPERATOR]: operator,
                            [GlobalConstant.RIGHT_EXPRESSION]:
                                newRightExpression,
                        },
                    ],
                    pageNumber: pageNumber,
                    limit: this.rows,
                };

                this.videoListData = await this.getVideoInfo(this.payload);
                if (this.videoListData) {
                    this.setPaginationInfo(this.videoListData);
                }
            } else if (hash) {
                this.queryType = QueryType.HASH;
                this.payload = {
                    hashValue: hash,
                    pageNumber: pageNumber,
                    limit: this.rows,
                };
                this.first = this.rows * (pageNumber - 1);
                this.videoListData = await this.getVideoInfo(this.payload);
                if (this.videoListData) {
                    this.setPaginationInfo(this.videoListData);
                }
            }
        });
    }

    async getTableColumn(): Promise<any> {
        return await this.dataService.getTableFields();
    }

    async goToPage(pageNumber: number) {
        const url = this.location.path();
        const index = url.lastIndexOf('/');
        const newUrl = `${url.substring(0, index)}/${pageNumber}`;
        this.location.go(newUrl);
        this.payload[this.formItem.PAGE_NUMBER] = pageNumber;
        this.payload[this.formItem.LIMIT] = this.rows;
        this.videoListData = await this.getVideoInfo(this.payload);
        this.setPaginationInfo(this.videoListData);
    }

    setPaginationInfo(videoInfoData: VideoInfoResponse) {
        this.pageNumber = videoInfoData.data.pageNumber;
        this.totalRecords = videoInfoData.data.totalRecords;
    }

    setToPage(pageNumber: number) {
        this.goToPage(pageNumber);
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
