export interface ListItem {
    name: string;
    code: string;
}

export interface SpliteVideoPayload {
    inputFile: string;
    outFolder: string;
    durations: Array<Array<string>>;
}

export interface RenamePayload {
    path: string;
    name: string;
    newName: string;
}

export const defaultFolder = [
    { name: 'D:\\jav', code: 'D:\\jav' },
    { name: 'D:\\jav\\zzz', code: 'D:\\jav\\zzz' },
    { name: 'D:\\jav\\done', code: 'D:\\jav\\done' },
];

export interface VideoInfoResponse {
    data: {
        videoList: [];
        pageNumber: number;
        totalRecords: number;
    };
}

export enum GlobalConstant {
    LEFT_EXPRESSION = 'leftExpression',
    RIGHT_EXPRESSION = 'rightExpression',
    PAGE_NUMBER = 'pageNumber',
    OPERATOR = 'operator',
    LOGIC = 'logic',
    CONDITIONS = 'conditions',
    FILE_PATH = 'filePath',
    HASH = 'hash',
}
