import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenameComponent } from './rename.component';
import { RenameRoutingModule } from './rename-routing.module';

@NgModule({
    imports: [CommonModule, RenameRoutingModule],
})
export class RenameModule {}
