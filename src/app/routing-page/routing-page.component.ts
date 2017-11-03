import { HostBinding, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group, animateChild } from '@angular/animations';

const SHARED_ANIMATION_STYLES = [
  style({ position: 'relative', height: '!' }),

  query(':enter, :leave', [
    style({ position: 'absolute', left: 0, top: 0, width: '100%' })
  ]),

  query(':enter', style({ opacity: 0 }))
];

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';

@Component({
  selector: 'app-routing-page',
  templateUrl: './routing-page.component.html',
  styleUrls: ['./routing-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        group([
          query('.main-route-container', [
            style({ opacity: 0, transform: 'translateY(-100%)'}),
            animate('800ms ' + NICE_EASING, style({ opacity: 1, transform: 'none'}))
          ]),
          query('.main-route-details', [
            style({ opacity: 0, transform: 'translateY(100%)'}),
            animate('800ms ' + NICE_EASING, style({ opacity: 1, transform: 'none'}))
          ])
        ])
      ])
    ]),
    trigger('routerAnimations', [
      transition(':enter', []),
      transition(':increment', [
        ...SHARED_ANIMATION_STYLES,
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
        ]),
        query(':leave', [
          animateChild(),
        ]),
        group([
          query(':leave', [
            animate('1s ' + NICE_EASING, style({ transform: 'translateX(-100%)', opacity: 0}))
          ]),
          query(':enter', [
            animate('0.5s 0.1s ' + NICE_EASING, style({ opacity: 1, transform: 'none' })),
          ]),
          query(':enter', [
            animateChild()
          ], { delay: '500ms' })
        ]),
      ]),
      transition(':decrement', [
        ...SHARED_ANIMATION_STYLES,
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
        ]),
        query(':leave', [
          animateChild(),
        ]),
        group([
          query(':leave', [
            animate('1s ' + NICE_EASING, style({ transform: 'translateX(100%)', opacity: 0 }))
          ]),
          query(':enter', [
            animate('0.5s 0.1s ' + NICE_EASING, style({ opacity: 1, transform: 'none' })),
          ]),
          query(':enter', [
            animateChild()
          ], { delay: '500ms' })
        ])
      ]),
    ]),
  ]
})
export class RoutingPageComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }
}
