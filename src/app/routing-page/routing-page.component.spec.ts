import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPageComponent } from './routing-page.component';

describe('RoutingPageComponent', () => {
  let component: RoutingPageComponent;
  let fixture: ComponentFixture<RoutingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
