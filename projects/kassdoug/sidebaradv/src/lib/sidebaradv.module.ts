import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationContentComponent } from './navigation-content/navigation-content.component';
import { RouterModule } from '@angular/router';
import { NavigationLinkComponent } from './navigation-content/modules/navigation-link/navigation-link.component';



@NgModule({
  declarations: [
    NavigationContentComponent, 
    NavigationLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationContentComponent
  ]
})
export class SidebaradvModule { }
