import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result.component';
import { GlobalConstant } from 'src/app/contentManager/api/type';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SearchResultComponent },
            {
                path: 'searchhash/:hash/page/:pageNumber',
                component: SearchResultComponent,
            },
            {
                path: `searchcondition/:${GlobalConstant.LEFT_EXPRESSION}/:${GlobalConstant.RIGHT_EXPRESSION}/:${GlobalConstant.PAGE_NUMBER}`,
                component: SearchResultComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchResultRoutingModule {}
