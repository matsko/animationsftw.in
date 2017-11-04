import { ViewChild, Component, HostBinding } from '@angular/core';
import { Router, RouterOutlet, NavigationStart } from '@angular/router';
import { CodeExampleService } from './code-example.service';
import { trigger, transition, animate, style, query, group, state, animateChild } from '@angular/animations';
import { ModalEvent, ModalService } from './modal.service';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { ModalComponent } from './modal/modal.component';
import { ToolTipService, ToolTipEvent } from './tool-tip.service';

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
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'none' })),
            animateChild()
          ]),
        ])
      ]),
      transition('* => advanced, * => routing, * => basics, * => programmatic', [
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

  @ViewChild('tooltip')
  public tooltip: ToolTipComponent;

  @ViewChild('modal')
  public modal: ModalComponent;

  constructor(private _router: Router, private _tooltipService: ToolTipService, private _modalService: ModalService, private _codeExampleService: CodeExampleService) {
    this._codeExampleService.onChange(status => {
      status === 'open' ? this.openCloseExample() : this.closeCodeExample();
    });

    this._router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.closeCodeExample();
      }
    });

    _tooltipService.changes.subscribe((e: ToolTipEvent) => {
      switch (e.action) {
        case 'reposition':
          const {x,y} = e.data;
          this.tooltip.position(e.type,e.data.x,e.data.y);
          break;
        case 'show':
          this.tooltip.position(e.type,e.data.x,e.data.y);
          this.tooltip.show();
          break;
        case 'hide':
          this.tooltip.hide();
          break;
      }
    });

    _modalService.changes.subscribe((e: ModalEvent) => {
      switch (e.action) {
        case 'show':
          this.modal.setDetails(e.codeFileName);
          this.modal.show();
          break;
        case 'hide':
          this.modal.hide();
          break;
      }
    });
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
