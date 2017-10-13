import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePage1Component } from './route-page1.component';

describe('RoutePage1Component', () => {
  let component: RoutePage1Component;
  let fixture: ComponentFixture<RoutePage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
