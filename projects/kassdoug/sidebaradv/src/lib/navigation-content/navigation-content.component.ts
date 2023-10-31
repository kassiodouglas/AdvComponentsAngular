import { Component, OnInit, Input, Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver,  AfterContentInit, HostListener   } from '@angular/core';
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
  links!:Array<any>;

  @Input()
  header:any;

  @Input()
  position:string = 'left'
  position_initial!:string

  @Input()
  withHover:boolean = false
  withHover_initial!:boolean
  
  @Input()
  router:boolean = true

  @Input()
  theme:string = 'default'

  @Input()
  topbar:any = null
  topbarIsComponent = false
  @ViewChild('containerTopbar', { read: ViewContainerRef }) containerTopbar!: ViewContainerRef

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;


  showToggle:boolean = true
  showToggle_initial!:boolean



  /** CONSTRUCTOR-------------------------------------------------------------------------------------------------------- */
  constructor(
    private eventEmitterService: EventEmitterService,
    private componentFactoryResolver: ComponentFactoryResolver

    ) { 
    this.eventEmitterService.onNavigaionToggle.subscribe((data: any) => {
      this.sidebarToggle()
    });
  }

  ngOnInit() {     
    this.withHover_initial = this.withHover
    this.showToggle_initial = this.showToggle
    this.position_initial = this.position

    this.topbarCheck() 
    this.checksize()
  }

  ngAfterContentInit(): void {
    setTimeout(()=>this.topbarCheck(), 0);  
    this.checksize()    
  }





  /** METHODS-------------------------------------------------------------------------------------------------------- */

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.checksize()
  }

  checksize(){

    if(this.screenWidth <= 720){
      this.withHover = false
      this.showToggle = false
      this.position = 'left'

    }else{
      this.withHover = this.withHover_initial
      this.showToggle = this.showToggle_initial
      this.position = this.position_initial

    }
  }

  topbarCheck(){
    if (typeof this.topbar !== 'string' && this.topbar !== null) {

      this.topbarIsComponent = true

      const factory: any = this.componentFactoryResolver.resolveComponentFactory( this.topbar);

      if(this.containerTopbar === undefined) {
        return
      }
      const componentRef = factory.create(this.containerTopbar.injector);
      this.containerTopbar.insert(componentRef.hostView);
    }
  }

  sidebarToggle(){
    this.showToggle = !this.showToggle
  }

  hoverSidebarToggle(){
    if(this.withHover == true)
      this.showToggle = !this.showToggle
  }

}
