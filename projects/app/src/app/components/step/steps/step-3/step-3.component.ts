import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step_3Component implements OnInit {

  @Output() onCompleteStep: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  completeStep(){
    this.onCompleteStep.emit({message:"Etapa 3 Completada com sucesso!"})
  }

}
