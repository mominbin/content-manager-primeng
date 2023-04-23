import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDetailComponent } from './video-detail.component';
import { VideoDetailRoutingModule } from './video-detail-routing.module';

@NgModule({
    imports: [CommonModule, VideoDetailRoutingModule],
    declarations: [VideoDetailComponent],
})
export class VideoDetailModule {}
