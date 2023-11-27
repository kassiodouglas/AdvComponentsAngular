import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'gd-cell',
  template: `
    <div *ngIf="!componentized; else cont" [innerHTML]="label"></div> 

    <ng-template #cont><ng-container #container></ng-container></ng-template>  
  `
})
export class CellComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef
  @Input() row:any
  @Input() col:any

  label:string|any = ''
  componentized:boolean = false

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.getLabel()   
  }

  getLabel(){
    const column_name = this.col.db

    if(column_name.includes(".")){

      let item = column_name.split('.').filter((f:any)=>f)

      let value = this.row    
      item.forEach((ff:any) => {
        value = value[ff]
      });      
      this.label = value

    }else{
      this.label = this.row[column_name]
    }

    if(typeof(this.label)=='object' && this.label !== null && this.label !== ''){

      if(this.label.component !== null){
        this.componentized = true     

        let instance = this.label.component.instance
        let properties = this.label.component.properties
        
        setTimeout(()=>this.setComponent(instance, properties),0)      
      }

    }
  }

  setComponent(cmpInstance:any, properties:any){
    const factory: any = this.componentFactoryResolver.resolveComponentFactory(cmpInstance);
    const componentRef = factory.create(this.container.injector);

    Object.keys(properties).forEach((key:any) => {   
      let value = properties[key]
      componentRef.instance[key] = value
    }); 

    this.container.insert(componentRef.hostView);
  }

}
