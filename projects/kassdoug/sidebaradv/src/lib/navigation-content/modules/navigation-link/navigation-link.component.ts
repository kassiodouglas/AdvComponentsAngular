import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationLinkInterface } from '../../models/NavigationLinkInterface';
import { EventEmitterService } from '../../services/navigation-toggle.service';


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

  @Output()
  onSetfav:EventEmitter<any> = new EventEmitter()

  arrowActive:boolean = false
  sidebarShow:boolean = true

  @Input()
  permissions:Array<string> = []

  @Input()
  usePermissions:boolean = true

  constructor(
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
  }

  arrow(){
    this.arrowActive = !this.arrowActive
  }

  show(){
    this.sidebarShow = !this.sidebarShow
  }

  setFav(link:any){

    var id = "fav_"+link.label.replace(' ','').toLowerCase()
    var star = document.querySelector(`#${id}`)
 
    var storage = localStorage.getItem('favoriteLinks')
    if(storage === null || storage === undefined) return

    var links = JSON.parse(storage)

    if(star?.classList.contains('active')){
      links.forEach((el:any,index:any) => {
          if(el.label == link.label){
            links.splice(index, 1)
          }
      });
      star?.classList.remove('active')

    }else{
      links.push(link)
      star?.classList.add('active')

    }

    localStorage.setItem('favoriteLinks', JSON.stringify(links))


    this.eventEmitterService.onSetFav.emit(link)

  }

  checkPermission(permisisons:any){

    if(this.usePermissions === false) return true

    if(permisisons === undefined) return true


    var result = false

    this.permissions.forEach((perm:any)=>{
      
      if(permisisons.includes(perm)){
        result = true
        return
      }
           
    })

    return result
  }

}
