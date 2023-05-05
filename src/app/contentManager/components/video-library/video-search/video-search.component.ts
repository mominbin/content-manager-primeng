import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from 'src/app/contentManager/api/type';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-video-search',
    templateUrl: './video-search.component.html',
    styleUrls: ['./video-search.component.scss'],
})
export class VideoSearchComponent implements OnInit {
    allSelected = false;
    searchTag: any = '';
    searchTags: ListItem[] = [];
    conditions: any[] = [
        {
            id: 0,
            logic: { name: '' },
            leftExpression: { name: 'video_casts' },
            operator: { name: 'is' },
            rightExpression: '风间由美',
        },
        {
            id: 1,
            logic: { name: 'and' },
            leftExpression: { name: 'video_genres' },
            operator: { name: 'not like' },
            rightExpression: '%VR%',
        },
        {
            id: 2,
            logic: { name: 'and' },
            leftExpression: { name: 'video_genres' },
            operator: { name: 'not like' },
            rightExpression: '%综合%',
        },
        {
            id: 2,
            logic: { name: 'and' },
            leftExpression: { name: 'video_genres' },
            operator: { name: 'not like' },
            rightExpression: '%介绍%',
        },
    ];

    selectedConditions: any;

    logics = [
        { name: 'logic', code: '0' },
        { name: 'and', code: 'and' },
        { name: 'or', code: 'or' },
    ];
    operators = [
        { name: 'is', code: 'is' },
        { name: '=', code: '=' },
        { name: 'like', code: 'like' },
        { name: 'not like', code: 'not like' },
    ];
    filteredLogics: any;
    filteredOperators: any;

    selectedLogic: any;
    filteredLeftExpression: any;
    leftExpressions: any;
    constructor(public dataService: DataService, private router: Router) {}

    async ngOnInit() {
        let result = await this.getTableColumn();
        this.leftExpressions = result.data.map((exp: any) => ({
            name: exp,
            code: exp,
        }));

        let response = await this.dataService.loadSearchTags();
        this.searchTags = response.data.map((item: string) => ({
            name: item.substring(0, 8),
            code: item,
        }));
        this.searchTag = this.searchTags ? this.searchTags[0] : '';
        this.loadSearchConditions(this.searchTag);
    }

    async getTableColumn(): Promise<any> {
        return await this.dataService.getTableFields();
    }

    toggoleCheckbox() {
        if (this.selectedConditions.length === this.conditions.length) {
            this.allSelected = true;
        } else {
            this.allSelected = false;
        }
        console.log(this.selectedConditions);
    }

    toggoleSelectAll() {
        if (this.allSelected) {
            this.selectedConditions = this.conditions;
        }

        if (!this.allSelected) {
            this.selectedConditions = [];
        }
    }

    addCondition() {
        let index = this.conditions.length;
        this.conditions.push({
            id: 0,
            logic: { name: 'and' },
            leftExpression: { name: 'video_casts' },
            operator: { name: 'is' },
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

    filterLeftExpression(_event: any) {
        const query = _event.query;
        this.filteredLeftExpression = this.filterField(
            this.leftExpressions,
            query
        );
    }

    filterLogic(_event: any) {
        const query = _event.query;
        this.filteredLogics = this.filterField(this.logics, query);
    }

    filterOperator(_event: any) {
        const query = _event.query;
        this.filteredOperators = this.filterField(this.operators, query);
    }

    filterField(fieldList: any, query: any) {
        const filtered: any[] = [];
        for (let i = 0; i < fieldList.length; i++) {
            const item = fieldList[i];
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    async search() {
        if (this.searchTag) {
            if (!this.searchTag.code) {
                await this.dataService.searchVideoByCondition(
                    this.getSearchPayload(this.searchTag)
                );
                this.router.navigate([
                    'videolibrary/searchresult/searchhash/' +
                        this.searchTag +
                        '/page/1',
                ]);
                return;
            }
            this.router.navigate([
                `videolibrary/searchresult/searchhash/${this.searchTag.code}/page/1`,
            ]);
            return;
        }
        let searchResult = await this.dataService.searchVideoByCondition(
            this.getSearchPayload('')
        );
        let hash = searchResult.data;
        this.router.navigate([
            'videolibrary/searchresult/searchhash/' + hash + '/page/1',
        ]);
    }

    getSearchPayload(tag: string) {
        const searchCondtions = this.conditions.map((condition) => ({
            logic: condition.logic.name,
            leftExpression: condition.leftExpression.name,
            operator: condition.operator.name,
            rightExpression: condition.rightExpression,
        }));
        let payload: any = {
            conditions: searchCondtions,
            pageNumber: 1,
        };
        if (tag) {
            payload.hashValue = tag;
        }
        console.log(payload);
        return payload;
    }

    async loadSearchConditions(_event: any) {
        if (!_event.code) {
            return;
        }
        let response = await this.dataService.loadSearchConditions(
            this.searchTag.code
        );
        let conditions = response.data;
        this.conditions = conditions.map((_condition: any) => ({
            logic: { name: _condition.logic },
            leftExpression: { name: _condition.leftExpression },
            operator: { name: _condition.operator },
            rightExpression: _condition.rightExpression,
        }));
    }
}
