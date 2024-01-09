import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { CellComponent } from './components/cell/cell.component';
import { IndividualFilterInputComponent } from './components/IndividualFilterInput/IndividualFilterInput.component'

@NgModule({
  declarations: [
    TableComponent, CellComponent,IndividualFilterInputComponent
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableAdvModule { }
