import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsPageComponent } from './basics-page.component';

describe('BasicsPageComponent', () => {
  let component: BasicsPageComponent;
  let fixture: ComponentFixture<BasicsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
