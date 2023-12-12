import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GriddataComponent } from './griddata.component';
import { FormsModule } from '@angular/forms';
import { ScrollDirective } from './scroll.directive';
import { CellComponent } from './cell.component';
import { InputIndividualSearchComponent } from './inputindividualsearch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    GriddataComponent
  ],
  declarations: [
    GriddataComponent,
    ScrollDirective,
    CellComponent,
    InputIndividualSearchComponent
   ]
})
export class GriddataModule { }
