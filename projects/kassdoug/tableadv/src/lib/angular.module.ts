import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GriddataComponent } from './griddata/griddata.component';
import { CellComponent } from './griddata/cell.component';
import { InputIndividualSearchComponent } from './griddata/inputindividualsearch.component'


@NgModule({
  declarations: [
    GriddataComponent, CellComponent,InputIndividualSearchComponent
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports: [
    GriddataComponent
  ]
})
export class TableAdvModule { }
