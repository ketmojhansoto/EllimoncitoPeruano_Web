import { TestBed } from '@angular/core/testing';

import { EnviocorreoService } from './enviocorreo.service';

describe('EnviocorreoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviocorreoService = TestBed.get(EnviocorreoService);
    expect(service).toBeTruthy();
  });
});
