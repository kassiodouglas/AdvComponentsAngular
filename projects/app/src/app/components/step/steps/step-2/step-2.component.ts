import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
export class Step_2Component implements OnInit {

  @Output() onCompleteStep: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
    
  }

  completeStep(){
    this.onCompleteStep.emit({message:"Etapa 2 Completada com sucesso!"})
  }

}
