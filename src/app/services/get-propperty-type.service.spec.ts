import { TestBed } from '@angular/core/testing';

import { GetProppertyTypeService } from './get-propperty-type.service';

describe('GetProppertyTypeService', () => {
  let service: GetProppertyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProppertyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
