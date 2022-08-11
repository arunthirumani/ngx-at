import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxAtDropdownlistComponent } from './ngx-at-dropdownlist.component';

@Component({
  selector: 'test-cmp',
  template: ` 
  <div class="dropdown-container">
    <ngx-at-dropdownlist [dataList]="dataList"></ngx-at-dropdownlist>
  </div>`
})
class TestComponent {
  @ViewChild(NgxAtDropdownlistComponent, { static: false }) ngxDropdown: NgxAtDropdownlistComponent;
  isOpen = false;
  stateChanges: boolean[] = [];
  dropdownClass = 'custom-class';
  disabled = false;
  show = true;
  dataList = ['apple', 'banana', 'orange'];

  recordStateChange($event) {
    this.stateChanges.push($event);
    this.isOpen = $event;
  }
}


describe('NgxAtDropdownlistComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxAtDropdownlistComponent,
        TestComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  it('should close when clicked outside', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    fixture.componentInstance.ngxDropdown.dropdownClickHandler(null);
    document.dispatchEvent(new MouseEvent('click'));
    const displayList = fixture.componentInstance.ngxDropdown.displayList;
    expect(displayList).toBeFalsy();
  });

  it('should close when ESC button is pressed', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    fixture.componentInstance.ngxDropdown.dropdownClickHandler(null);
    const event = new KeyboardEvent("keyup", {
      'key': 'Escape'
    });
    document.dispatchEvent(event);
    const displayList = fixture.componentInstance.ngxDropdown.displayList;
    expect(displayList).toBeFalsy();
  });

  it('should close when Enter button is pressed', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    fixture.componentInstance.ngxDropdown.dropdownClickHandler(null);
    const event = new KeyboardEvent("keyup", {
      'key': 'Enter'
    });
    document.dispatchEvent(event);
    const displayList = fixture.componentInstance.ngxDropdown.displayList;
    expect(displayList).toBeFalsy();
  });
});

