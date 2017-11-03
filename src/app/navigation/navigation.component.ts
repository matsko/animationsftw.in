import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnimationCountService } from '../animation-count.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('counterChangeAnimation', [
      transition(':enter', []),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class NavigationComponent {
  constructor(private _router: Router, private _animationCount: AnimationCountService, private _parent: AppComponent) {}

  toggleDisableAnimations() {
    this._parent.toggleAnimations();
  }

  animationsDisabled() {
    return this._parent.animationsDisabled;
  }

  get totalAnimations() {
    return this._animationCount.total;
  }

  get activeRoutePath(): string {
    return this._router.url;
  }

  isActiveRoute(path: string) {
    if (path.length > 1) {
      const regex = new RegExp('^' + path);
      return regex.test(this.activeRoutePath);
    }
    return path == this.activeRoutePath;
  }
}
