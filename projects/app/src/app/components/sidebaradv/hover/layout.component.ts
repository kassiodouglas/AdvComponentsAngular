import { Component, OnInit } from '@angular/core';
import { Service } from '../../../services/service.service';

@Component({
  selector: 'app-layout',
  template: `
  <sidebaradv 
    position="left" 
    [links]="sidebarLinks" 
    [withHover]="true"

    ></sidebaradv>
  `
})
export class LayoutSidebarHoverComponent implements OnInit {
  sidebarLinks!:any

  constructor(
    private service:Service
  ) { }

  ngOnInit() {
    this.sidebarLinks = this.service.sidebarlinks()
  }

}
