import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoSearchComponent } from './video-search.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: VideoSearchComponent }]),
    ],
    exports: [RouterModule],
})
export class VideoSearchRoutingModule {}
