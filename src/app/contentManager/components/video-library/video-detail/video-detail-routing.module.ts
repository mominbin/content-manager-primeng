import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoDetailComponent } from './video-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: VideoDetailComponent },
            { path: 'linkid/:video_link', component: VideoDetailComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class VideoDetailRoutingModule {}
