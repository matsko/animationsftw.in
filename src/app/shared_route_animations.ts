import {animation, style, group, animate, stagger, query} from '@angular/animations';

export const PAGE_IN_ANIMATION = animation([
  query('.main-route-details', [
    style({ opacity: 0, transform: 'translateY(-100px)' }),
  ], { optional: true }),
  query('.main-route-details > *', [
    style({ opacity: 0, transform: 'translateY(100px)' }),
  ], { optional: true }),
  group([
    query('.main-route-details', [
      animate('900ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
    ], { optional: true }),
    query('.main-route-details > *', [
      stagger(50, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ])
    ], { optional: true }),
  ])
]);

/*
 style({ height: '{{ height }}px' })

 function saggerLeftFactory(time: number) {
  return function staggerLeftRight(element: any, styles: any, params: any, allElements: any[]) {
    return 0; // column 1
    return 100; // column 2
  }
}

style()
animate()
stagger
query(queryFn)

function queryFn(containerElement: any, queryFn: Function, params) {
  const elements = queryFn(...).filter
}

 stagger(staggerLeftFactory(1000), [...])
*/

export const PAGE_OUT_ANIMATION = animation([
  group([
    query('.main-route-details > *', [
      stagger(50, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(-100px)' }))
      ])
    ], { optional: true }),
    query('.main-route-details', [
      animate('800ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(100px)' }))
    ], { optional: true }),
  ])
]);
