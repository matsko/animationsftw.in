import { TestBed, inject } from '@angular/core/testing';

import { CodeExampleService } from './code-example.service';

describe('CodeExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeExampleService]
    });
  });

  it('should be created', inject([CodeExampleService], (service: CodeExampleService) => {
    expect(service).toBeTruthy();
  }));
});
