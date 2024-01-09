import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from './topbar/topbar.component';
import { Service } from '../../services/service.service';
import { HeaderComponent } from './header/header.component';
import { HeaderEmitterService } from './header/header-emitter.service';


@Component({
  selector: 'app-layout',
  template: `
  <sidebaradv 
    [links]="sidebarLinks" 
    [header]="header"
    [topbar]="topbar"
    [permissions]="permissions"
    [usePermissions]="true"

    [withHover]="hover"
    [search]="search"
    [theme]="theme"
    [position]="position" 

    ></sidebaradv>
  `
})
export class LayoutComponent implements OnInit {

  sidebarLinks!:any
  topbar:any
  header:any
  theme:string = 'dark'
  search:boolean = false
  hover:boolean = false
  position:string = 'left'

  permissions:Array<string> = ['home']


  constructor(
    private service:Service,
    private headerEmiter: HeaderEmitterService
  ) { 
    this.headerEmiter.onTheme.subscribe(e=>this.theme = e)
    this.headerEmiter.onSearch.subscribe(e=>this.search = e)
    this.headerEmiter.onHover.subscribe(e=>this.hover = e)
    this.headerEmiter.onPosition.subscribe(e=>this.position = e)
  }

  ngOnInit() {
    this.sidebarLinks = this.service.sidebarlinks()
    this.topbar = TopbarComponent
    this.header = HeaderComponent
  }

}
