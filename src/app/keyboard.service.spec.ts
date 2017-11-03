import { TestBed, inject } from '@angular/core/testing';

import { KeyboardService } from './keyboard.service';

describe('KeyboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardService]
    });
  });

  it('should be created', inject([KeyboardService], (service: KeyboardService) => {
    expect(service).toBeTruthy();
  }));
});
