import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-video-search',
    templateUrl: './video-search.component.html',
    styleUrls: ['./video-search.component.scss'],
})
export class VideoSearchComponent implements OnInit {
    formItem = {
        LEFT_EXPRESSION: 'leftExpression',
        RIGHT_EXPRESSION: 'rightExpression',
        OPERATOR: 'operator',
        LOGIC: 'logic',
        PAGE_NUMBER: 'pageNumber',
        CONDITIONS: 'conditions',
    };

    videoInfoField = {
        VIDEO_ID: 'video_id',
        IMG_URL: 'img_url',
        DATE: 'date',
        TITLE: 'title',
        GOT_IT: 'got_it',
        VIDEO_GENRES: 'video_genres',
        VIDEO_LINK: 'video_link',
    };

    conditions: any[] = [
        {
            id: 0,
            logic: 'and',
            leftExpression: 'genric',
            operator: 'is',
            rightExpression: 'hhh',
        },
    ];
    selectedConditions: any;

    logics = [
        { name: 'logic', code: '0' },
        { name: 'and', code: 'and' },
        { name: 'logic', code: 'or' },
    ];
    selectedLogic: any;

    leftExpressions = ['a', 'b', 'c'];

    constructor() {}

    ngOnInit() {}

    addCondition() {
        let index = this.conditions.length;
        this.conditions.push({
            id: index,
            logic: 'and',
            leftExpression: '',
            operator: 'is',
            rightExpression: '',
        });
    }
    deleteItem(condition: any) {
        const indexToDelete = this.conditions.indexOf(condition);
        if (indexToDelete !== -1) {
            this.conditions.splice(indexToDelete, 1);
        }
        this.selectedConditions = null;
    }
}
