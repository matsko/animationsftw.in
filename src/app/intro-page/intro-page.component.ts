import { Component, HostBinding } from '@angular/core';
import { transition, trigger, query, style, animate, stagger } from '@angular/animations';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query(':self, .logo > *', style({ opacity: 0 })),
        query(':self, .logo > *', [
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class IntroPageComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  constructor() { }
}
