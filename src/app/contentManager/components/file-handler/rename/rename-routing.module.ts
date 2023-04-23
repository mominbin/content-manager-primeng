import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RenameComponent } from './rename.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RenameComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RenameRoutingModule {}
