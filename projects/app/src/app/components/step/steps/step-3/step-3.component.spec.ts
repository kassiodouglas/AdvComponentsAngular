/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Step-3Component } from './step-3.component';

describe('Step-3Component', () => {
  let component: Step-3Component;
  let fixture: ComponentFixture<Step-3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step-3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step-3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
