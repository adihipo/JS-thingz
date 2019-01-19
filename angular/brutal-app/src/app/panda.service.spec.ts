import { TestBed } from '@angular/core/testing';

import { PandaService } from './panda.service';

describe('PandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PandaService = TestBed.get(PandaService);
    expect(service).toBeTruthy();
  });
});
