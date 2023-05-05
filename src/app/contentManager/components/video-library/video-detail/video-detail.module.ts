import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDetailComponent } from './video-detail.component';
import { VideoDetailRoutingModule } from './video-detail-routing.module';
import { PanelModule } from 'primeng/panel';
import { ChipModule } from 'primeng/chip';

@NgModule({
    imports: [CommonModule, VideoDetailRoutingModule, PanelModule, ChipModule],
    declarations: [VideoDetailComponent],
})
export class VideoDetailModule {}
