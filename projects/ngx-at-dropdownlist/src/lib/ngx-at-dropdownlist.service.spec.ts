import { TestBed } from '@angular/core/testing';

import { NgxAtDropdownlistService } from './ngx-at-dropdownlist.service';

describe('NgxAtDropdownlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAtDropdownlistService = TestBed.get(NgxAtDropdownlistService);
    expect(service).toBeTruthy();
  });
});
