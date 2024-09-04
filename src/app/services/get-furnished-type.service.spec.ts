import { TestBed } from '@angular/core/testing';

import { GetFurnishedTypeService } from './get-furnished-type.service';

describe('GetFurnishedTypeService', () => {
  let service: GetFurnishedTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFurnishedTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
