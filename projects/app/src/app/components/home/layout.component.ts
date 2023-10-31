import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { Service } from '../../services/service.service';


@Component({
  selector: 'app-layout',
  template: `
  <sidebaradv 
    position="left" 
    [links]="sidebarLinks" 
    [withHover]="true"
    [theme]="'dark'"
    [topbar]="topbar"

    ></sidebaradv>
  `
})
export class LayoutHomeComponent implements OnInit {

  sidebarLinks!:any
  topbar:any

  constructor(
    private service:Service
  ) { }

  ngOnInit() {
    this.sidebarLinks = this.service.sidebarlinks()
    this.topbar = TopbarComponent
  }

}
