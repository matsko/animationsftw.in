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
      state('active', style({ width: '75%' })),
      state('inactive', style({ width: '25%' })),
      state('default', style({ width: '50%' })),
      transition(':enter', []),
      transition('* => inactive', [
        animate('250ms ease-out', style({ width: '25%' })),
      ]),
      transition('* => default', [
        animate('250ms ease-out', style({ width: '50%' })),
      ]),
      transition('* => active', [
        query(':enter, :leave', style({ position: 'absolute', top:0, left: 0, right: 0 })),
        query(':enter', style({ opacity: 0 })),
        query(':enter > *', style({ opacity: 0, transform: 'translateY(-50px)' })),

        group([
          animate('250ms ease-out', style({ width: '75%' })),
          query(':leave', [
            animate('300ms', style({ opacity: 0 }))
          ]),
        ]),

        query(':enter, :enter > *', [
          stagger('50ms', [
            animate('300ms', style('*'))
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
