import { Component, HostBinding } from '@angular/core';
import { Router, RouterOutlet, NavigationStart } from '@angular/router';
import { CodeExampleService } from './code-example.service';
import { trigger, transition, animate, style, query, group, state, animateChild } from '@angular/animations';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* => intro', [
        style({ position: 'relative' }),
        query(':enter, :leave', style({
          position: 'absolute', top:0, left:0, width: '100%'
        })),
        group([
          query(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('1200ms ease-out', style({ transform: 'none' })),
            animateChild()
          ]),
          // broken here
          query(':leave', [
            style({ zIndex: 1000 }),
            animate('10000ms ease-out', style({ transform: 'translateY(100%)' }))
          ])
        ])
      ]),
      transition('* => advanced, * => routing, * => basics', [
        query(':enter', animateChild())
      ]),
      transition('* => *', [])
    ]),
    trigger('routerContainerAnimation', [
      state('false', style({ transform: 'translateX(0%)' })),
      state('true', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate('300ms ease-out'))
    ]),
    trigger('codeExampleAnimation', [
      transition(':enter', []),
      transition('* => false', [
        group([
          query('.router-container', animateChild()),
          query('.code-container', [
            style({ transform: 'translateX(0%)' }),
            animate('300ms ease-out', style({ transform: 'translateX(100%)' })),
          ]),
        ]),
      ]),
      transition('* => true', [
        query('.code-close-surface', [
          style({ opacity: 0 }),
        ]),
        group([
          query('.router-container', animateChild()),
          query('.code-container', [
            style({ transform: 'translateX(100%)' }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
          ]),
        ]),
        query('.code-close-surface', [
          animate('300ms', style({ opacity: 1 }))
        ]),
      ]),
    ]),
  ]
})
export class AppComponent {
  showCodeExample = false;

  @HostBinding('@.disabled')
  animationsDisabled = false;

  constructor(private _router: Router, private _modalService: ModalService, private _codeExampleService: CodeExampleService) {
    this._codeExampleService.onChange(status => {
      status === 'open' ? this.openCloseExample() : this.closeCodeExample();
    });

    this._router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.closeCodeExample();
      }
    });
  }

  get modalVisible() {
    return this._modalService.visible;
  }

  onRouteChange() {
  }

  closeCodeExample() {
    this.showCodeExample = false;
  }

  openCloseExample() {
    this.showCodeExample = true;
  }

  disableAnimations() {
    this.animationsDisabled = true;
  }

  enableAnimations() {
    this.animationsDisabled = false;
  }

  toggleAnimations() {
    this.animationsDisabled ? this.enableAnimations() : this.disableAnimations();
  }

  prepRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }
}
