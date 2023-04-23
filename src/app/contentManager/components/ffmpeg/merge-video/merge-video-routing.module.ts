import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MergeVideoComponent } from './merge-video.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: MergeVideoComponent }]),
    ],
    exports: [RouterModule],
})
export class MergeVideoRoutingModule {}
