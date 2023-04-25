import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/contentManager/service/data.service';

@Component({
    selector: 'app-video-search',
    templateUrl: './video-search.component.html',
    styleUrls: ['./video-search.component.scss'],
})
export class VideoSearchComponent implements OnInit {
    toggleCheck = false;
    conditions: any[] = [
        {
            id: 0,
            logic: { name: '' },
            leftExpression: { name: 'video_casts' },
            operator: { name: 'is' },
            rightExpression: '八乃つばさ',
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
    }

    async getTableColumn(): Promise<any> {
        return await this.dataService.getTableFields();
    }

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
        const searchCondtions = this.conditions.map((condition) => ({
            logic: condition.logic.name,
            leftExpression: condition.leftExpression.name,
            operator: condition.operator.name,
            rightExpression: condition.rightExpression,
        }));
        const payload = {
            conditions: searchCondtions,
            pageNumber: 1,
        };
        let searchResult = await this.dataService.searchVideoByCondition(
            payload
        );
        let hash = searchResult.data;
        this.router.navigate([
            'videolibrary/searchresult/searchhash/' + hash + '/page/1',
        ]);
    }
}
