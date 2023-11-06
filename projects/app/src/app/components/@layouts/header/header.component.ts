import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderEmitterService } from './header-emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:string = ''
  search:boolean = false
  hover:boolean = false
  position:string = 'left'

  @Output() onTheme: EventEmitter<any> = new EventEmitter() 
  @Output() onSearch: EventEmitter<any> = new EventEmitter() 

  constructor(
    private emiterservice: HeaderEmitterService
  ) { 
  }

  ngOnInit() {
  }

  themer(theme:string){
    this.emiterservice.onTheme.emit(theme)
  }

  searcher(){
    this.search = !this.search
    this.emiterservice.onSearch.emit(this.search)
  }

  withhover(){
    this.hover = !this.hover
    this.emiterservice.onHover.emit(this.hover)
  }

  positioner(){
    this.position = (this.position == 'left') ? 'right' : 'left'
    this.emiterservice.onPosition.emit(this.position)
  }
 

}
