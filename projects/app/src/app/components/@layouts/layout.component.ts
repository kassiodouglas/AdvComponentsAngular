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
    [permissions]="permissions"
    [usePermissions]="true"
  
    [useFav]="useFav"
    [withHover]="hover"
    [search]="search"
    [theme]="theme"
    [position]="position" 
    [topbar]="''"

    ></sidebaradv>
  `
})
export class LayoutComponent implements OnInit {

  sidebarLinks!:any
  topbar:any
  header:any 
  search:boolean = false
  hover:boolean = false
  position:string = 'left'
  useFav:boolean = false

  permissions:Array<string> = ['home']  

  theme:any = {
    color_base: 'linear-gradient(180deg, rgba(113,25,105,1) 0%, rgba(86,15,136,1) 100%)',
    color_base_topbar: 'rgba(113,25,105,1)',
    color_font: '#fff',
    color_base_link_icon: '#210224',
    color_base_link: 'transparent',
    color_back_link: '#380e3b',
    color_border: 'linear-gradient(90deg,rgba(240, 240, 240, 0) 0%,rgba(0, 0, 0, 0.3) 19%,rgba(0, 0, 0, 0.3) 87%,rgba(218, 218, 218, 0) 100%)'
  };  



  constructor(
    private service:Service,
    private headerEmiter: HeaderEmitterService
  ) { 
    this.headerEmiter.onTheme.subscribe(e=>this.theme = e)
    this.headerEmiter.onSearch.subscribe(e=>this.search = e)
    this.headerEmiter.onHover.subscribe(e=>this.hover = e)
    this.headerEmiter.onPosition.subscribe(e=>this.position = e)
    this.headerEmiter.onUseFav.subscribe(e=>this.useFav = e)
  }

  ngOnInit() {
    this.sidebarLinks = this.service.sidebarlinks()
    this.topbar = TopbarComponent
    this.header = HeaderComponent
  }

}
