import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAtChipInputComponent } from './ngx-at-chip-input.component';

describe('NgxAtChipInputComponent', () => {
  let component: NgxAtChipInputComponent;
  let fixture: ComponentFixture<NgxAtChipInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAtChipInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAtChipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
