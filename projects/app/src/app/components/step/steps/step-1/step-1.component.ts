import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step_1Component implements OnInit {

  @Output() onCompleteStep: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  completeStep(){
    this.onCompleteStep.emit({message:"Etapa 1 Completada com sucesso!"})
  }

}
