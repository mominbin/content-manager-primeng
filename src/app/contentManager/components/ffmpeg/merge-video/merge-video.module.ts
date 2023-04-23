import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MergeVideoRoutingModule } from './merge-video-routing.module';
import { MergeVideoComponent } from './merge-video.component';
import { PickListModule } from 'primeng/picklist';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ContentManagerModule } from '../../../content-manager.module';

@NgModule({
    declarations: [MergeVideoComponent],
    imports: [
        CommonModule,
        MergeVideoRoutingModule,
        PickListModule,
        InputTextModule,
        AutoCompleteModule,
        FormsModule,
        ContentManagerModule,
    ],
    exports: [MergeVideoComponent],
})
export class MergeVideoModule {}
