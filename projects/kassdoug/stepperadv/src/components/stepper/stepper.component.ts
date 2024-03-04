import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  NgZone,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';
import { fadeState } from '../../assets/animation';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  animations: [fadeState],
})
export class StepperComponent implements OnInit, AfterViewInit, OnChanges {
  statePageArea = 'hide';

  @Input() steps!: Array<any>;

  actualStep: number = 0;
  prevlStep: number = 0;
  nextlStep: number = 1;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  @Output() onCompleteStep: EventEmitter<any> = new EventEmitter();
  @Output() onChangeStep: EventEmitter<any> = new EventEmitter();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  /** ciclos------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initialStep();
    this.sePrevNextSteps();
  }

  ngAfterViewInit(): void {
    this.changerStep(this.actualStep);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  /** methods------------------------------------------------------------------------------------------- */

  changeAnimationState(state: string) {
    this.statePageArea = state;
  }

  /** Verifica qual a etapa em progresso */
  initialStep() {
    this.steps.map(
      (item, i) => (item.completed = i == 0 ? 'progress' : 'false')
    );

    // let x = false;
    // let index = 0;
    // while (x == false) {
    //   if (this.steps[index].completed == 'true') {
    //     index += 1;
    //   } else {
    //     x = true;
    //     this.actualStep = index;
    //   }
    // }
  }

  /** Configura a proxima etapa e a anterior */
  sePrevNextSteps() {
    this.prevlStep = this.actualStep == 0 ? 0 : this.actualStep - 1;
    this.nextlStep =
      this.actualStep == this.steps.length
        ? this.steps.length
        : this.actualStep + 1;
  }

  /** Altera a etapa */
  changerStep(stepIndex: number = 0) {
    setTimeout(() => {
      let step = this.steps[stepIndex];

      if (step === undefined) return;
      if (step.completed == 'true' || step.completed == 'progress') {
        this.actualStep = stepIndex;

        this.changeAnimationState('hide');

        this.sePrevNextSteps();

        if (!this.viewContainerRef) return;

        setTimeout(() => this.changeAnimationState('show'), 500);
        setTimeout(() => {
          this.viewContainerRef.clear();

          const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(
              step.component
            );
          const componentRef =
            this.viewContainerRef.createComponent(componentFactory);

          // Afirmação de tipo para informar ao TypeScript sobre o tipo esperado
          const childComponent = componentRef.instance as {onCompleteStep: EventEmitter<any>;};

          // Captura o evento onCompleteStep do componente filho
          if (childComponent.onCompleteStep) {
            childComponent.onCompleteStep.subscribe((e: any) => {
              this.completedStep(e);
            });
          }
        }, 600);
      }
    });
  }

  /** */
  completedStep(event: any) {
    let step = this.steps[this.actualStep];
    step.index = this.actualStep;
    step.content = event;
    this.onCompleteStep.emit(step);

    this.changerStep(this.actualStep + 1);
  }
}
