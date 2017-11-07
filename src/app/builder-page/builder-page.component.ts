import { ViewChild, HostBinding, Component } from '@angular/core';
import { PhotoScrubberComponent } from '../photo-scrubber/photo-scrubber.component';
import { trigger, group, sequence, transition, state, style, animate, query, stagger, animateChild } from '@angular/animations';
import { AnimationCountService } from '../animation-count.service';

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/builder-page-animations.example-ts'},
  {title: 'Photo List Animation', fileName: '/assets/code/builder-page-list-animation.example-ts'}
];

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.left, .right, .design-image', [
          style({ opacity: 0, transform: 'translateX(-50px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class BuilderPageComponent {
  @ViewChild('scrubber')
  public scrubber: PhotoScrubberComponent;

  @HostBinding('@pageAnimations')
  public animatePage = true;

  playerStatus = 'Play';

  constructor(private _animationCount: AnimationCountService) {
    this._animationCount.specifyAnimations(PAGE_ANIMATIONS);
  }

  public photos: string[] = [
    "/assets/gallery/15.jpg",
    "/assets/gallery/3.jpg",
    "/assets/gallery/12.jpg",
    "/assets/gallery/11.jpg",
    "/assets/gallery/44.jpg",
    "/assets/gallery/1.jpg",
    "/assets/gallery/5.jpg",
    "/assets/gallery/59.jpg",
    "/assets/gallery/42.jpg",
    "/assets/gallery/19.jpg",
    "/assets/gallery/23.jpg",
    "/assets/gallery/33.jpg",
    "/assets/gallery/7.jpg",
    "/assets/gallery/29.jpg",
    "/assets/gallery/10.jpg",
    "/assets/gallery/28.jpg"
  ];
}
