import { HostListener, HostBinding, Component } from '@angular/core';
import { trigger, transition, animate, style, state, query, stagger, group, animateChild } from '@angular/animations';
import { AnimationCountService } from '../animation-count.service';

const SECTIONS = {
  resources: 1,
  lukas: 2,
  matias: 3
};

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/resources-page-animation.example-ts'},
  {title: 'Active Image Animation', fileName: '/assets/code/resources-page-cell-animation.example-ts'}
];

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.cell', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: '*' })),
          ])
        ])
      ])
    ]),
    trigger('gridCell', [
      state('true', style({ width:'46%', opacity:1})),
      state('false', style({ width: '27%', opacity:0.5})),
      transition('* => false', group([
        animate('150ms ' + NICE_EASING)
      ])),
      transition('* => true', group([
        query('img:enter', [
          style({opacity:0}),
          animate('300ms', style({opacity:1}))
        ], {optional:true}),
        query('.inner *', [
          style({ opacity: 0, height: 0 }),
          stagger(50, [
            animate('500ms', style({ opacity: 1, height: '*' }))
          ])
        ]),
        animate('150ms ' + NICE_EASING)
      ]))
    ])
  ]
})
export class ResourcesPageComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  section = SECTIONS.resources;
  sections = SECTIONS;

  constructor(private _animationCount: AnimationCountService) {
    this._animationCount.specifyAnimations(PAGE_ANIMATIONS);
  }

  isSectionActive(section: number) {
    return section === this.section;
  }
}
