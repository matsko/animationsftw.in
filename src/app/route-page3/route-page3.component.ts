import { HostBinding, Component } from '@angular/core';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION } from '../shared_route_animations';

@Component({
  selector: 'app-route-page3',
  templateUrl: './route-page3.component.html',
  styleUrls: ['./route-page3.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', useAnimation(PAGE_IN_ANIMATION)),
      transition(':leave', useAnimation(PAGE_OUT_ANIMATION))
    ]),
  ]
})
export class RoutePage3Component {
  @HostBinding('@pageAnimations')
  public animatePage = true;
}
