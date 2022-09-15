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

  it('Chips should not be added when form control is disabled', () => {
    component.chipList.disable();
    fixture.detectChanges();
    const inputBox = inputNativeElement.querySelector('input');
    inputBox.value="test";
    const event = new KeyboardEvent("keyup", {
      'key': 'Enter'
    });
    inputBox.dispatchEvent(event);
    fixture.detectChanges();
    const chipCount = component.chipList.value.length;    
    expect(chipCount).toEqual(3);
  });

  it('Chip should be deleted when clicked on cross button', () => {
    const closeButton = inputNativeElement.querySelector('button');
    const event = new Event('click');
    closeButton.dispatchEvent(event);
    const chipCount = component.chipList.value.length;    
    expect(chipCount).toEqual(2);
  });

  it('Placeholder input should be honoured', () => {
    const inputBox = inputNativeElement.querySelector('input');    
    expect(inputBox.placeholder).toEqual('custom place holder');
  });

});



@Component({
  template: `<ngx-at-chip-input placeholder="custom place holder" [formControl]="chipList"></ngx-at-chip-input>`
})
class TestChipInput implements OnInit {
  @ViewChild(NgxAtChipInputComponent, { static: false }) chipInput: NgxAtChipInputComponent;
  chipList = new FormControl();
  ngOnInit() {
    this.chipList.setValue(['test1', 'chip1', 'another chip']);
  }
}
