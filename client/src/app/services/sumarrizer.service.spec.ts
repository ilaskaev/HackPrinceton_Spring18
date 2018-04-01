import { TestBed, inject } from '@angular/core/testing';

import { SumarrizerService } from './sumarrizer.service';

describe('SumarrizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SumarrizerService]
    });
  });

  it('should be created', inject([SumarrizerService], (service: SumarrizerService) => {
    expect(service).toBeTruthy();
  }));
});
