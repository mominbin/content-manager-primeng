import { NgModule } from '@angular/core';
import { OptionalAutoCompleteComponent } from './components/optional-auto-complete/optional-auto-complete.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './service/data.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [OptionalAutoCompleteComponent],
    imports: [FormsModule, AutoCompleteModule, InputTextModule],
    providers: [DataService],
    exports: [OptionalAutoCompleteComponent],
})
export class ContentManagerModule {}
