import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepperService } from './services/stepper.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers:[
    StepperService
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperadvModule { }
