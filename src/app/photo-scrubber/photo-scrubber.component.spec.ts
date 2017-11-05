import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoScrubberComponent } from './photo-scrubber.component';

describe('PhotoScrubberComponent', () => {
  let component: PhotoScrubberComponent;
  let fixture: ComponentFixture<PhotoScrubberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoScrubberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoScrubberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
