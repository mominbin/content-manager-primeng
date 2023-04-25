import { Injectable, OnDestroy } from '@angular/core';
import { VideoInfoResponse } from '../api/type';

@Injectable()
export class VideoSearchService implements OnDestroy {
    searchResult!: VideoInfoResponse;
    searchPayload!: Object;
    constructor() {}
    ngOnDestroy() {}
}
