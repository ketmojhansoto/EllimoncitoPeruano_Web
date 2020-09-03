import { TestBed } from '@angular/core/testing';

import { OrdenonlineService } from './ordenonline.service';

describe('OrdenonlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdenonlineService = TestBed.get(OrdenonlineService);
    expect(service).toBeTruthy();
  });
});
