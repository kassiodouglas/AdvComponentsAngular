import { Component, OnInit } from '@angular/core';
import { Service } from '../../../services/service.service';
import { TopbarComponent } from '../../@layouts/topbar/topbar.component';

@Component({
  selector: 'app-layout',
  template: `
  <sidebaradv 
    position="left" 
    [links]="sidebarLinks" 
    [withHover]="true"
    [topbar]="topbarComponent"
    ></sidebaradv>
  `
})
export class LayoutSidebarWithtopbarComponent implements OnInit {
  sidebarLinks!:any
  topbarComponent:any

  constructor(
    private service:Service
  ) { }

  ngOnInit() {
    this.sidebarLinks = this.service.sidebarlinks()
    this.topbarComponent = TopbarComponent
  }

}
