import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAtDropdownlistComponent } from './ngx-at-dropdownlist.component';

describe('NgxAtDropdownlistComponent', () => {
  let component: NgxAtDropdownlistComponent;
  let fixture: ComponentFixture<NgxAtDropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAtDropdownlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAtDropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
