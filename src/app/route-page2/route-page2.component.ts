import { HostBinding, Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION } from '../shared_route_animations';

@Component({
  selector: 'app-route-page2',
  templateUrl: './route-page2.component.html',
  styleUrls: ['./route-page2.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', useAnimation(PAGE_IN_ANIMATION)),
      transition(':leave', useAnimation(PAGE_OUT_ANIMATION))
    ]),
  ]
})
export class RoutePage2Component {
  @HostBinding('@pageAnimations')
  public animatePage = true;
}
