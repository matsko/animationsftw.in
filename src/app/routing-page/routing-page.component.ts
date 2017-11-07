import { HostBinding, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group, animateChild } from '@angular/animations';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';

const SHARED_ANIMATION_STYLES = [
  style({ position: 'relative', height: '!' }),

  query(':enter, :leave', [
    style({ position: 'absolute', left: 0, top: 0, width: '100%' })
  ]),

  query(':enter', style({ opacity: 0 }))
];

const PAGE_ANIMATIONS = [
  {title: 'Page Animations', fileName: '/assets/code/routing-page-animations.example-ts'},
  {title: 'Route Change Right', fileName: '/assets/code/routing-page-change-right.example-ts'},
  {title: 'Route Change Left', fileName: '/assets/code/routing-page-change-left.example-ts'}
];

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';

const PAGES = [
  '/routing',
  '/routing/page2',
  '/routing/page3',
  '/routing/page4',
]

@Component({
  selector: 'app-routing-page',
  templateUrl: './routing-page.component.html',
  styleUrls: ['./routing-page.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.main-route-container', [
          style({ opacity: 0, transform: 'translateY(100px)'}),
          animate('800ms ' + NICE_EASING, style({ opacity: 1, transform: 'none'}))
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

  private _keydownBinding: KeyboardBinding;

  constructor(private animationService: AnimationCountService, private _router: Router) {
    animationService.specifyAnimations(PAGE_ANIMATIONS);

    this._keydownBinding = new KeyboardBinding([Keys.KEY_LEFT, Keys.KEY_RIGHT], keyCode => {
      if (keyCode === Keys.KEY_LEFT) {
        this.left();
      } else if (keyCode === Keys.KEY_RIGHT) {
        this.right();
      }
    });
  }

  left() {
    const currentUrl = this._router.url;
    const index = PAGES.indexOf(currentUrl);
    const nextIndex = Math.max(index - 1, 0);
    const url = PAGES[nextIndex];
    this._navigate(url);
  }

  right() {
    const currentUrl = this._router.url;
    const index = PAGES.indexOf(currentUrl);
    const nextIndex = Math.min(index + 1, PAGES.length - 1);
    const url = PAGES[nextIndex];
    this._navigate(url);
  }

  private _navigate(path: string) {
    this._router.navigateByUrl(path);
  }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }

  isRouteActive(num: string) {
    let path = '/routing';
    if (num != '1') {
      path += `/page${num}`;
    }
    return this._router.url === path;
  }
}
