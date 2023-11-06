import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HeaderEmitterService {

  public onTheme: EventEmitter<any> = new EventEmitter();
  public onSearch: EventEmitter<any> = new EventEmitter();
  public onHover: EventEmitter<any> = new EventEmitter();
  public onPosition: EventEmitter<any> = new EventEmitter();

  constructor() { }

}

