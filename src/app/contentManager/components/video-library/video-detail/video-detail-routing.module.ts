import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoDetailComponent } from './video-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: VideoDetailComponent }]),
    ],
    exports: [RouterModule],
})
export class VideoDetailRoutingModule {}
