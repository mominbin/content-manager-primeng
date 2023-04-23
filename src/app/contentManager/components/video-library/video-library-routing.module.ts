import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'videosearch',
                loadChildren: () =>
                    import('./video-search/video-search.module').then(
                        (m) => m.VideoSearchModule
                    ),
            },
            {
                path: 'videodetail',
                loadChildren: () =>
                    import('./video-detail/video-detail.module').then(
                        (m) => m.VideoDetailModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class VideoLibraryRoutingModule {}
