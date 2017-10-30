import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-routing-page',
  templateUrl: './routing-page.component.html',
  styleUrls: ['./routing-page.component.css'],
  animations: [
    trigger('routerAnimations', [
      transition(':enter', []),
      transition('* => *', [
        style({ position: 'relative', height: '!' }),

        query(':enter', [
          style({ opacity: 0, position: 'absolute', left: 0, top: 0, right: 0 })
        ]),
        query(':leave', [
          style({ position: 'absolute', left: 0, top: 0, right: 0 }),
          animateChild()
        ]),
        query(':enter', [
          style({ opacity: 1 }),
          animateChild()
        ]),
      ]),
    ]),
  ]
})
export class RoutingPageComponent {
  constructor() { }

  prepRouteTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }
}
