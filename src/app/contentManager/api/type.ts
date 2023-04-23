export interface ListItem {
    name: string;
    code: string;
}

export interface SpliteVideoPayload {
    inputFile: string;
    outFolder: string;
    durations: Array<Array<string>>;
}