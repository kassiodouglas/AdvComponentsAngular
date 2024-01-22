import { Component, OnInit } from '@angular/core';
import { Step_1Component } from './steps/step-1/step-1.component';
import { Step_2Component } from './steps/step-2/step-2.component';
import { Step_3Component } from './steps/step-3/step-3.component';
import { StepperService } from '@kassdoug/stepperadv';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  steps!: Array<any>

  constructor( 
    private stepperService: StepperService
   ) { }

  ngOnInit() {
    this.steps = [
      {label:"Etapa 1", component:Step_1Component},
      {label:"Etapa 2", component:Step_2Component},
      {label:"Etapa 3", component:Step_3Component},
    ]
  }

  onChangeStep(e:any){
    console.log('onChangeStep in StepComponent')

    let stepPrev = this.stepperService.gePrevStep()
    console.log(stepPrev)

    let stepActual = this.stepperService.getActualStep(this.steps)
    console.log(stepActual)

    let stepNext = this.stepperService.getNextStep()
    console.log(stepNext)
  }

  onCompletedStep(e:any){
    console.log('onCompletedStep  in StepComponent')

    this.steps = this.stepperService.completedStepper(this.steps, e)
  }

}
