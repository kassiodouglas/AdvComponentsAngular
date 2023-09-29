import { NgModule } from '@angular/core';
import { GriddataComponent } from './griddata/griddata.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CellComponent } from './griddata/cell.component';



@NgModule({
  declarations: [
    GriddataComponent, CellComponent
  ],
  imports: [    
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports: [
    GriddataComponent
  ]
})
export class TableAdvModule { }
