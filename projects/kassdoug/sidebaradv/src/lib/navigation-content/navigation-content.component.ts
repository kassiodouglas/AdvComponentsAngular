import { Component, OnInit, Input, Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, HostListener } from '@angular/core';
import { EventEmitterService } from './services/navigation-toggle.service';
// import { NavigationEnd, Router as Routerr } from '@angular/router';

@Injectable()
@Component({
  selector: 'sidebaradv',
  templateUrl: './navigation-content.component.html',
  styleUrls: ['./navigation-content.component.scss']
})
export class NavigationContentComponent implements OnInit, AfterContentInit {


  /** PROPERTIES-------------------------------------------------------------------------------------------------------- */

  @Input()
  links!: Array<any>;
  links_list!: Array<any>;
  favorite_links: any = { id: "favoriteLinks", label: 'Links Favoritos (0)', icon: '<i class="fa-solid fa-star"></i>', links: [] }

  @Input()
  header: any;
  headerIsComponent = false
  @ViewChild('containerHeader', { read: ViewContainerRef }) containerHeader!: ViewContainerRef

  @Input()
  position: string = 'left'
  position_initial!: string

  @Input()
  withHover: boolean = false
  withHover_initial!: boolean

  @Input()
  router: boolean = true

  @Input()
  theme: string = 'default'

  @Input()
  topbar: any = null
  topbarIsComponent = false
  @ViewChild('containerTopbar', { read: ViewContainerRef }) containerTopbar!: ViewContainerRef

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  showToggle: boolean = true
  showToggle_initial!: boolean

  @Input()
  search: boolean = false
  filter_link: string = ''

  @Input()
  permissions:Array<string> = []

  @Input()
  usePermissions:boolean = false



  /** CONSTRUCTOR-------------------------------------------------------------------------------------------------------- */

  constructor(
    private eventEmitterService: EventEmitterService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.eventEmitterService.onNavigaionToggle.subscribe((data: any) => {
      this.sidebarToggle()
    });
    this.eventEmitterService.onSetFav.subscribe((data: any) => {
      setTimeout(()=>{
      this.setFavoriteLinks()

      },10)
    });
  }

  ngOnInit() {
    this.withHover_initial = this.withHover
    this.showToggle_initial = this.showToggle
    this.position_initial = this.position

    this.topbarCheck()
    this.headerCheck()
    this.checksize()

    this.setFavoriteLinks()


    this.links_list = JSON.parse(JSON.stringify(this.links));

    this.links_list.forEach(el => {
      this.initFavorites(el)      
    });

    this.links_list.unshift(this.favorite_links)




  }

  ngAfterContentInit(): void {
    setTimeout(() => this.topbarCheck(), 0);
    setTimeout(() => this.headerCheck(), 0);
    this.checksize()
  }





  /** METHODS-------------------------------------------------------------------------------------------------------- */

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.checksize()
  }

  checksize() {

    if (this.screenWidth <= 720) {
      this.withHover = false
      this.showToggle = false
      this.position = 'left'

    } else {
      this.withHover = this.withHover_initial
      this.showToggle = this.showToggle_initial
      this.position = this.position_initial

    }
  }

  topbarCheck() {
    if (typeof this.topbar !== 'string' && this.topbar !== null) {

      this.topbarIsComponent = true

      const factory: any = this.componentFactoryResolver.resolveComponentFactory(this.topbar);

      if (this.containerTopbar === undefined) {
        return
      }
      const componentRef = factory.create(this.containerTopbar.injector);
      this.containerTopbar.insert(componentRef.hostView);
    }
  }

  headerCheck() {
    if (typeof this.header !== 'string' && this.header !== null) {

      this.headerIsComponent = true

      const factory: any = this.componentFactoryResolver.resolveComponentFactory(this.header);

      if (this.containerHeader === undefined) {
        return
      }
      const componentRef = factory.create(this.containerHeader.injector);
      this.containerHeader.insert(componentRef.hostView);
    }
  }

  sidebarToggle() {
    this.showToggle = !this.showToggle
  }

  hoverSidebarToggle() {
    if (this.withHover == true)
      this.showToggle = !this.showToggle
  }

  recursiveSearch(data: any, text: string): any {
   


    if(data.hasOwnProperty('dividder')) return

    text = text.toLowerCase()

    if (data.hasOwnProperty('label') && data.hasOwnProperty('path')) {

      let label = data['label'].toLowerCase()

      if (label.includes(text)) {
        return data;
      }

    } else if (data.hasOwnProperty('links')) {

      var ell: any = []
      data.links.forEach((el: any) => {

        var res = this.recursiveSearch(el, text)
        if (res !== undefined)
          ell.push(res)
      });

      if (ell.length == 0)
        return undefined

      data.links = ell
      return data

    }

  }

  searchLinks() {

    this.links_list = JSON.parse(JSON.stringify(this.links));
    this.links_list.unshift(this.favorite_links)
    var filtered_menu: Array<any> = []


    if (this.filter_link != '') {

      this.links_list.forEach((obj: any) => {
        if (obj.id !== 'favoriteLinks') {
          var x = this.recursiveSearch(obj, this.filter_link)

          if (x !== undefined){

            if(x.hasOwnProperty('links') && x.links[0].length == 0) ''       
            else filtered_menu.push(x)
          }
          
        }
      })


      var alllinks = Object.assign(filtered_menu.filter(i => i !== undefined), this.favorite_links)
      this.links_list = alllinks

      if (this.links_list == undefined || this.links_list.length == 0 || this.links_list[0].length == 0) {
        this.links_list = [{ divider: "Nenhum menu encontrado" }]
      }

    }

  }

  setFavoriteLinks() {

    var storage = localStorage.getItem('favoriteLinks')

    if(storage === undefined || storage === null){
      localStorage.setItem('favoriteLinks',JSON.stringify([]))
      storage = localStorage.getItem('favoriteLinks')
    }


    if(storage!== undefined && storage !== null){

      var links = JSON.parse(storage)
      var indexToRemove:Array<number> = []

      links.forEach((link:any, index:number) => {   

        var permited:boolean = false
        if(this.usePermissions){  
   
          if(link.permissions !== undefined){            

            link.permissions.forEach((perm:any) => {  
             
                if(this.permissions.includes(perm)){              
                  permited = true
                  return
                }
            })

          }else{
            permited = true
            return
          };

        }else{
          permited = true
        }         

        if(permited){
          link['isfav'] = true    
          link['favArea'] = true   
        }else{
          indexToRemove.push(index)
        }

      });

      indexToRemove.forEach((x:number)=>links.pop(x))
        

      this.favorite_links.links = links
      this.favorite_links.label = `Links Favoritos (${links.length})`

      localStorage.setItem('favoriteLinks',JSON.stringify(links))
    }

  }

  initFavorites(el:any){
    
    if(el.hasOwnProperty('links')){
      this.initFavorites(el.links)

    }else if(el.length > 0){     
      el.forEach((ellink:any) => {
        this.initFavorites(ellink)        
      });

    }else{    
      this.favorite_links.links.forEach((fav:any) => {
        if(fav.label == el.label){
          el['isfav'] = true
          fav['favArea'] = true
        }
      });

    }
  }
  


}
