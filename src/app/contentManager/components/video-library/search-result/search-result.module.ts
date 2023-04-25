import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { VideoSearchService } from 'src/app/contentManager/service/video-search.service';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';

@NgModule({
    imports: [
        CommonModule,
        SearchResultRoutingModule,
        TagModule,
        DataViewModule,
        RatingModule,
    ],
    declarations: [SearchResultComponent],
    providers: [VideoSearchService],
})
export class SearchResultModule {}
