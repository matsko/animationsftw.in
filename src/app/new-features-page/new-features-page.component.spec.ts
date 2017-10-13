import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeaturesPageComponent } from './new-features-page.component';

describe('NewFeaturesPageComponent', () => {
  let component: NewFeaturesPageComponent;
  let fixture: ComponentFixture<NewFeaturesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeaturesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
