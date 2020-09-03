import { TestBed } from '@angular/core/testing';

import { EmailordenService } from './emailorden.service';

describe('EmailordenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailordenService = TestBed.get(EmailordenService);
    expect(service).toBeTruthy();
  });
});
