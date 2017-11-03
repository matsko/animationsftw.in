import { TestBed, inject } from '@angular/core/testing';

import { AnimationCountService } from './animation-count.service';

describe('AnimationCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationCountService]
    });
  });

  it('should be created', inject([AnimationCountService], (service: AnimationCountService) => {
    expect(service).toBeTruthy();
  }));
});
