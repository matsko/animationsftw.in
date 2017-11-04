import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationDetailsComponent } from './animation-details.component';

describe('AnimationDetailsComponent', () => {
  let component: AnimationDetailsComponent;
  let fixture: ComponentFixture<AnimationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
