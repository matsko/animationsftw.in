import { Component } from '@angular/core';
import { trigger, group, sequence, transition, state, style, animate, query, stagger, animateChild } from '@angular/animations';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.css'],
  animations: [
    trigger('sectionContainerAnimations', [
      transition(':enter', []),
      transition('* => *', [
        query('@sectionAnimations', animateChild()),
      ]),
    ]),
    trigger('sectionAnimations', [
      state('active', style({ width: '80%' })),
      state('inactive', style({ width: '20%' })),
      state('default', style({ width: '50%' })),
      transition(':enter', []),
      transition('* => active', [
        query(':enter', style({ opacity: 0 })),
        animate('500ms ease-out'), // bug here
        query(':enter', [
          stagger('100ms', [
            animate('0.5s ease-out', style({ opacity: 1 }))
          ])
        ])
      ]),
      transition('* => *', [
        animate('500ms ease-out'),
      ]),
    ]),
  ]
})
export class BuilderPageComponent {
  constructor() { }

  currentSection: number = 1;

  sections = {
    default: 1,
    programmatic: 2,
    scrubbing: 3,
  };

  showSection(section: number) {
    this.currentSection = section;
  }

  showDefaultOrSection(section: number) {
    if (section != this.currentSection) {
      section = this.currentSection != this.sections.default ? this.sections.default : section;
      this.showSection(section);
    }
  }

  computeSectionState(section: number) {
    if (this.currentSection == this.sections.default) {
      return 'default';
    }
    if (section == this.currentSection) {
      return 'active';
    }
    return 'inactive';
  }

  isExpanded(section: number) {
    return this.currentSection == section;
  }

  isDefault(section: number) {
    return this.currentSection == this.sections.default;
  }
}
