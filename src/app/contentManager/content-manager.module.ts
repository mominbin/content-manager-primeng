import { NgModule } from '@angular/core';
import { OptionalAutoCompleteComponent } from './components/optional-auto-complete/optional-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './service/data.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { VideoSearchService } from './service/video-search.service';

@NgModule({
    declarations: [OptionalAutoCompleteComponent],
    imports: [FormsModule, AutoCompleteModule, DropdownModule, InputTextModule],
    providers: [DataService, VideoSearchService],
    exports: [OptionalAutoCompleteComponent],
})
export class ContentManagerModule {}
