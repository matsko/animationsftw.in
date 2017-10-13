import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePage4Component } from './route-page4.component';

describe('RoutePage4Component', () => {
  let component: RoutePage4Component;
  let fixture: ComponentFixture<RoutePage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutePage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutePage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
