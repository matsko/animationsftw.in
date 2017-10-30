import {animation, style, animate, stagger, query} from '@angular/animations';

export const PAGE_IN_ANIMATION = animation([
  query('.animate-item', [
    style({ opacity: 0, transform: 'translateX(-100px)' }),
    stagger('50ms', [
      animate('200ms ease-out', style({ opacity: 1, transform: 'none' }))
    ]),
  ], { optional: true }),
]);

export const PAGE_OUT_ANIMATION = animation([
  query('.animate-item', [
    stagger('50ms', [
      animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(100px)' }))
    ]),
  ], { optional: true }),
]);
