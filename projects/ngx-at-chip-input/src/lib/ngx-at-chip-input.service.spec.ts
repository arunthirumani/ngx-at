import { TestBed } from '@angular/core/testing';

import { NgxAtChipInputService } from './ngx-at-chip-input.service';

describe('NgxAtChipInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAtChipInputService = TestBed.get(NgxAtChipInputService);
    expect(service).toBeTruthy();
  });
});
