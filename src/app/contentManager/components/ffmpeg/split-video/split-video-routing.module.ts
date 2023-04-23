import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitVideoComponent } from './split-video.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: SplitVideoComponent }]),
    ],
    exports: [RouterModule],
})
export class SplitVideoRoutingModule {}
