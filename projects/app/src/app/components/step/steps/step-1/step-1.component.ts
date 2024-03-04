import { Component, OnInit, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step_1Component implements OnInit, AfterViewInit {

  @Output() onCompleteStep: EventEmitter<any> = new EventEmitter();
  form:FormGroup

  isCompleted:boolean = false

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nome:['',Validators.required],
      sobrenome:['',Validators.required],
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.checkStepCompleted())   
  }



  checkStepCompleted(){
    let dataForm = localStorage.getItem('step1-form')
    if(dataForm === undefined || dataForm === null) return
    
    let data:any = JSON.parse(dataForm)

    this.isCompleted = true
    console.log(data)
    this.form.patchValue(data)
  }

  completeStep(e:any){
    this.onCompleteStep.emit(e)
  }

  onSubmit(){  
    if(this.form.valid){
      localStorage.setItem('step1-form',JSON.stringify(this.form.value))
      this.completeStep(this.form.value)
    }else{
      Notiflix.Notify.warning('Verifique os campos!')
    }
  }

}
