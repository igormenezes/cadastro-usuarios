import { TestBed, inject } from '@angular/core/testing';

import { ValidatorFormService } from './validator-form.service';

describe('ValidatorFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorFormService]
    });
  });

  it('should be created', inject([ValidatorFormService], (service: ValidatorFormService) => {
    expect(service).toBeTruthy();
  }));
});
