import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenameRoutingModule } from './rename-routing.module';
import { ContentManagerModule } from 'src/app/contentManager/content-manager.module';
import { RenameComponent } from './rename.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RenameComponent],
    imports: [
        CommonModule,
        FormsModule,
        RenameRoutingModule,
        ContentManagerModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
    ],
    exports: [RenameComponent],
})
export class RenameModule {}
