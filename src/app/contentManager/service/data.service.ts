import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RenamePayload, SpliteVideoPayload } from '../api/type';
import { environment } from 'src/environments/environment';
let LOCAL_URL = 'http://localhost:8000/';
if (environment.debug) {
    LOCAL_URL = environment.apiEndpoint;
}
const FILE_HANDLE = `${LOCAL_URL}filehandle/`;
const VIDEO_INFO = `${LOCAL_URL}videoData/`;
const API_URLS = {
    getFileList: `${FILE_HANDLE}getfilelist`,
    getNewName: `${FILE_HANDLE}getnewname`,
    getFilesNewName: `${FILE_HANDLE}getFilesNewName`,
    renameCheckedFiles: `${FILE_HANDLE}renameCheckedFiles`,
    rename: `${FILE_HANDLE}rename`,
    splitVideo: `${LOCAL_URL}cutvideobatch`,
    concentrateVideo: `${LOCAL_URL}concentrateVideo`,
    concatvideoes: `${LOCAL_URL}concatvideoes`,
    videoCustomizeSearch: `${VIDEO_INFO}videoCustomizeSearch`,
    getVideoInfoByHash: `${VIDEO_INFO}getVideoInfoByHash`,
    searchVideoByCondition: `${VIDEO_INFO}videoByCondition`,
    videoDetail: `${VIDEO_INFO}videoDetail`,
    loadSearchConditions: `${VIDEO_INFO}loadSearchConditions`,
    loadSearchTags: `${VIDEO_INFO}loadSearchTags`,
    videoStream: `${VIDEO_INFO}videoStream`,
    videoField: `${VIDEO_INFO}tableFields`,
    playVideo: `${VIDEO_INFO}playVideo`,
};
@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    async getVideoInfoByHash(payload: any): Promise<any> {
        return lastValueFrom(
            this.http.post<any>(API_URLS.getVideoInfoByHash, payload)
        );
    }
    async getCountries() {
        return lastValueFrom(
            this.http.get<any>('assets/demo/data/countries.json')
        )
            .then((res) => res.data as any[])
            .then((data) => data);
    }

    async mergeVideo(payload: any): Promise<any> {
        return lastValueFrom(
            this.http.post<any>(API_URLS.concatvideoes, payload)
        );
    }

    async getFileList(data: any): Promise<any> {
        return lastValueFrom(this.http.post<any>(API_URLS.getFileList, data));
    }

    async playVideo(payload: any): Promise<any> {
        return lastValueFrom(this.http.post<any>(API_URLS.playVideo, payload));
    }

    async concentrateVideo(payload: any): Promise<any> {
        return lastValueFrom(
            this.http.post<SpliteVideoPayload>(
                API_URLS.concentrateVideo,
                payload
            )
        );
    }

    async getTableFields(): Promise<any> {
        return lastValueFrom(this.http.get<any>(API_URLS.videoField));
    }

    async spliteVideo(payload: SpliteVideoPayload): Promise<any> {
        return lastValueFrom(
            this.http.post<SpliteVideoPayload>(API_URLS.splitVideo, payload)
        );
    }

    async rename(payload: RenamePayload): Promise<any> {
        return lastValueFrom(
            this.http.post<RenamePayload>(API_URLS.rename, payload)
        );
    }

    async getFormatedName(payload: { [name: string]: string }): Promise<any> {
        return lastValueFrom(
            this.http.post<string>(API_URLS.getNewName, payload)
        );
    }

    async getFilesNewName(payload: { [name: string]: string }): Promise<any> {
        return lastValueFrom(
            this.http.post<string>(API_URLS.getFilesNewName, payload)
        );
    }

    async renameCheckedFiles(payload: {
        [name: string]: string;
    }): Promise<any> {
        return lastValueFrom(
            this.http.post<string>(API_URLS.renameCheckedFiles, payload)
        );
    }

    async searchVideoByCondition(payload: any): Promise<any> {
        return lastValueFrom(
            this.http.post<any>(API_URLS.searchVideoByCondition, payload)
        );
    }

    async videoCustomizeSearch(payload: any): Promise<any> {
        return lastValueFrom(
            this.http.post<any>(API_URLS.videoCustomizeSearch, payload)
        );
    }
    async getVideoDetail(videoLink: string): Promise<any> {
        return lastValueFrom(
            this.http.get<any>(API_URLS.videoDetail, {
                params: { video_link: videoLink },
            })
        );
    }

    async loadSearchTags(): Promise<any> {
        return lastValueFrom(this.http.get<any>(API_URLS.loadSearchTags));
    }

    async loadSearchConditions(tag: string): Promise<any> {
        return lastValueFrom(
            this.http.get<any>(API_URLS.loadSearchConditions, {
                params: { searchTag: tag },
            })
        );
    }
}
