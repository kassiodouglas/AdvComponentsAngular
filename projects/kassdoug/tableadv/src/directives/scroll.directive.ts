import { Directive, ElementRef, HostListener, Output,EventEmitter  } from '@angular/core';

@Directive({
  selector: '[appScrollListener]'
})
export class ScrollDirective {

  @Output() fixedHeader: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = (event.target as HTMLElement).scrollTop;

  
    if(scrollTop >= 25){
      this.fixedHeader.emit(true); 
    }else{
      this.fixedHeader.emit(false); 
    }


  }
}