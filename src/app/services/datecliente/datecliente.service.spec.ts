import { TestBed } from '@angular/core/testing';

import { DateclienteService } from './datecliente.service';

describe('DateclienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateclienteService = TestBed.get(DateclienteService);
    expect(service).toBeTruthy();
  });
});
