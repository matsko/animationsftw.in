import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPageComponent } from './advanced-page.component';

describe('AdvancedPageComponent', () => {
  let component: AdvancedPageComponent;
  let fixture: ComponentFixture<AdvancedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
