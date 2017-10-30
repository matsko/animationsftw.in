import { Component } from '@angular/core';
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

  get activeRoutePath(): string {
    return this._router.url;
  }

  onRouteChange() {
  }

  closeCodeExample() {
    this.showCodeExample = false;
  }

  openCloseExample() {
    this.showCodeExample = true;
  }

  isActiveRoute(path: string) {
    if (path.length > 1) {
      const regex = new RegExp('^' + path);
      return regex.test(this.activeRoutePath);
    }
    return path == this.activeRoutePath;
  }

  prepRouteAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || '';
  }
}
