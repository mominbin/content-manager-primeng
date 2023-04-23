import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'splitVideo',
                loadChildren: () =>
                    import('./split-video/split-video.module').then(
                        (m) => m.SplitVideoModule
                    ),
            },
            {
                path: 'mergeVideo',
                loadChildren: () =>
                    import('./merge-video/merge-video.module').then(
                        (m) => m.MergeVideoModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class FfmpegRoutingModule {}
