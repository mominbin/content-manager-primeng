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
