import { Component, OnInit, Input } from '@angular/core';
import { NavigationLinkInterface } from '../../models/NavigationLinkInterface';


@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss']
})

export class NavigationLinkComponent implements OnInit {

  @Input()
  link!: NavigationLinkInterface;

  @Input()
  theme:string = 'default';

  arrowActive:boolean = false
  sidebarShow:boolean = true

  constructor() { }

  ngOnInit() {
  }

  arrow(){
    this.arrowActive = !this.arrowActive
  }

  show(){
    this.sidebarShow = !this.sidebarShow
  }

}
