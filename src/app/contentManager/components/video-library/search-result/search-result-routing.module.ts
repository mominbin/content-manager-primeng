import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SearchResultComponent },
            {
                path: 'searchhash/:hash/page/:pageNumber',
                component: SearchResultComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchResultRoutingModule {}
