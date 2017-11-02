import { Component } from '@angular/core';
import { trigger, transition, style, state, animate } from '@angular/animations';

const SECTIONS = {
  intro: 1,
  triggers: 2,
  component: 3,
  transition: 4,
  fadeInFadeOut: 5,
  animationCallback: 6
}

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.css'],
  animations: [
    trigger('contentAnimation', [
      transition(':enter', []),

      state(`${SECTIONS.intro}`, style({ transform: 'translateY(0px)' })),
      state(`${SECTIONS.triggers}`, style({ transform: 'translateY(-600px)' })),
      state(`${SECTIONS.component}`, style({ transform: 'translateY(-1300px)' })),
      state(`${SECTIONS.transition}`, style({ transform: 'translateY(-2000px)' })),
      state(`${SECTIONS.fadeInFadeOut}`, style({ transform: 'translateY(-2700px)' })),
      state(`${SECTIONS.animationCallback}`, style({ transform: 'translateY(-3400px)' })),

      transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class BasicsPageComponent {
  constructor() { }

  section = SECTIONS.intro;
  visibleSection = SECTIONS.intro;

  sections = SECTIONS;

  isActive(value: number) {
    return value === this.section;
  }

  onInnerSectionClick(value: number) {
    if (value != this.visibleSection) {
      this.section = value;
    }
  }
}
