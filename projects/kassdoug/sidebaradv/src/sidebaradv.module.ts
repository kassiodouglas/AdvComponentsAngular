import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/content/content.component';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './components/link/link.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContentComponent, 
    LinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ContentComponent
  ]
})
export class SidebaradvModule { }
