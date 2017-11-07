import { Component, HostBinding } from '@angular/core';
import { AnimationCountService } from '../animation-count.service';
import { transition, trigger, query, style, animate, stagger } from '@angular/animations';

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/intro-page-animation.example-ts'}
];

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query(':self, .logo > *, .viking', [
          style({ opacity: 0 }),
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

  constructor(private _animationCount: AnimationCountService) {
    this._animationCount.specifyAnimations(PAGE_ANIMATIONS);
  }
}
