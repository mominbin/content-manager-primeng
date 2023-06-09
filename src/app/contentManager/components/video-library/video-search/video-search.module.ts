import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoSearchComponent } from './video-search.component';
import { VideoSearchRoutingModule } from './video-search-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        VideoSearchRoutingModule,
        ToolbarModule,
        TableModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        CheckboxModule,
        DropdownModule,
        AutoCompleteModule,
        PaginatorModule,
    ],
    declarations: [VideoSearchComponent],
    exports: [VideoSearchComponent],
})
export class VideoSearchModule {}
