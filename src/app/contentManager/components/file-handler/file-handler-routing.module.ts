import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'rename',
                loadChildren: () =>
                    import('./rename/rename.module').then(
                        (m) => m.RenameModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class FileHandlerRoutingModule {}
