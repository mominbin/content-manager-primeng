import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitVideoRoutingModule } from './split-video-routing.module';
import { ContentManagerModule } from 'src/app/contentManager/content-manager.module';
import { SplitVideoComponent } from './split-video.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [SplitVideoComponent],
    imports: [
        CommonModule,
        FormsModule,
        SplitVideoRoutingModule,
        ContentManagerModule,
        AutoCompleteModule,
        InputSwitchModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
        InputMaskModule,
        RippleModule,
        ToastModule,
        FileUploadModule,
    ],
    exports: [SplitVideoComponent],
})
export class SplitVideoModule {}
