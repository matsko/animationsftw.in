import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderPageComponent } from './builder-page.component';

describe('BuilderPageComponent', () => {
  let component: BuilderPageComponent;
  let fixture: ComponentFixture<BuilderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
