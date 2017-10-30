import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippetComponent } from './code-snippet.component';

describe('CodeSnippetComponent', () => {
  let component: CodeSnippetComponent;
  let fixture: ComponentFixture<CodeSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
