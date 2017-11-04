import { HostBinding, Component } from '@angular/core';
import { trigger, group, sequence, transition, state, style, animate, query, stagger, animateChild } from '@angular/animations';

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
  @HostBinding('@pageAnimations')
  public animatePage = true;
}
