import { TestBed } from '@angular/core/testing';

import { UseridService } from './userid.service';

describe('UseridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseridService = TestBed.get(UseridService);
    expect(service).toBeTruthy();
  });
});
