import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationContentComponent } from './navigation-content/navigation-content.component';
import { RouterModule } from '@angular/router';
import { NavigationLinkComponent } from './navigation-content/modules/navigation-link/navigation-link.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavigationContentComponent, 
    NavigationLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavigationContentComponent
  ]
})
export class SidebaradvModule { }
