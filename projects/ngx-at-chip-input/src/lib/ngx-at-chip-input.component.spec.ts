import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NgxAtChipInputComponent } from './ngx-at-chip-input.component';

describe('NgxAtChipInputComponent', () => {
  let component: TestChipInput;
  let fixture: ComponentFixture<TestChipInput>;
  let inputDebugElement: DebugElement;
  let inputNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxAtChipInputComponent, TestChipInput],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChipInput);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputDebugElement = fixture.debugElement.query(By.directive(NgxAtChipInputComponent));
    inputNativeElement = inputDebugElement.nativeElement;
  });

  it('Enter keyup should invoke addChipHandler()', () => {
    spyOn(component.chipInput, 'addChipHandler');
    const inputBox = inputNativeElement.querySelector('input');
    inputBox.value="test";
    const event = new KeyboardEvent("keyup", {
      'key': 'Enter'
    });
    inputBox.dispatchEvent(event);    
    expect(component.chipInput.addChipHandler).toHaveBeenCalled();
  });
});

@Component({
  template: `<ngx-at-chip-input [formControl]="chipList"></ngx-at-chip-input>`
})
class TestChipInput implements OnInit {
  @ViewChild(NgxAtChipInputComponent, { static: false }) chipInput: NgxAtChipInputComponent;
  chipList = new FormControl();
  ngOnInit() {
    this.chipList.setValue(['test1', 'chip1', 'another chip']);
  }
}
