import { Component, OnInit, Input, Injectable } from '@angular/core';
import { EventEmitterService } from './services/navigation-toggle.service';
import { NavigationEnd, Router as Routerr } from '@angular/router';

@Injectable()
@Component({
  selector: 'sidebaradv',
  templateUrl: './navigation-content.component.html',
  styleUrls: ['./navigation-content.component.scss']
})
export class NavigationContentComponent implements OnInit {

  @Input()
  links!:Array<any>;

  @Input()
  header:any;

  @Input()
  position:string = 'left'

  @Input()
  withHover:boolean = false
  
  @Input()
  router:boolean = true

  @Input()
  theme:string = 'default'

  showToggle:boolean = true

  constructor(
    private eventEmitterService: EventEmitterService,
    private routerr: Routerr
    ) { 
    this.eventEmitterService.onNavigaionToggle.subscribe((data: any) => {
      this.sidebarToggle()
    });
  }

  ngOnInit() { 

    // this.routerr.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Aqui você pode executar a lógica que desejar quando a rota for alterada
    //     console.log('Rota alterada:', event.url);
    //   }
    // });

  }

  sidebarToggle(){
    this.showToggle = !this.showToggle
  }

}
