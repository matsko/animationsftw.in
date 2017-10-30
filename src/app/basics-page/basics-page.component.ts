import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.css'],
  animations: [
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('0.5s ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class BasicsPageComponent {
  constructor() { }

  section = 1;

  sections = {
    intro: 1,
    triggers: 2,
    component: 3,
    transition: 4,
    fadeInFadeOut: 5,
    animationCallback: 6
  };

  isActive(value: number) {
    return value === this.section;
  }
}
