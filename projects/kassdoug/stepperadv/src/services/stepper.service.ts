import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {

  step!:any
  stepNext!:any
  stepPrev!:any

  constructor() {}

  /** Seta na lib a finalização da etapa */
  completedStepper(steps:Array<any>, event:any) {
    let stepActual = event.index;
    let nextActual = stepActual + 1;


    steps[stepActual].completed = 'true';
    if (steps[nextActual]) steps[nextActual].completed = 'progress';

    this.step = (steps[nextActual]) ? steps[nextActual] : steps[stepActual];
    this.stepNext = (steps[nextActual+1]) ? steps[nextActual+1] : this.step;
    this.stepPrev = steps[stepActual];

    return steps
  }

  setSteps(steps:Array<any>){
    return steps
  }

  getActualStep(steps:Array<any>){
    return this.step
  }

  getNextStep(){
    return this.stepNext
  }

  gePrevStep(){
    return this.stepPrev    
  }
}
