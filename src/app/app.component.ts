import { ChangeDetectorRef, ViewChild, Component, HostBinding } from '@angular/core';
import { Router, RouterOutlet, NavigationStart } from '@angular/router';
import { CodeExampleService } from './code-example.service';
import { trigger, transition, animate, style, query, group, state, animateChild } from '@angular/animations';
import { ModalEvent, ModalService } from './modal.service';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { ModalComponent } from './modal/modal.component';
import { ToolTipService, ToolTipEvent } from './tool-tip.service';
import PHOTOS from './photos';

const MIN_PAGE_TIMEOUT = 2000;
const ELASTIC_BEZIER = 'cubic-bezier(.26,1.96,.58,.61)';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loadingAnimation', [
      transition(':enter', [
        query('.text', [
          style({ marginTop: '-200px' }),
          animate('1500ms ' + ELASTIC_BEZIER, style({ marginTop: '0px' }))
        ])
      ]),
      transition(':leave', [
        query('.text', [
          animate('800ms ease-out', style({ opacity: '0' }))
        ]),
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('routeAnimation', [
      transition('* => intro', [
        style({ position: 'relative' }),
        query(':enter, :leave', style({
          position: 'absolute', top:0, left:0, width: '100%'
        })),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100px)', opacity:0 }),
            animate('300ms ease-out', style({ opacity:1, transform: 'none' })),
            animateChild()
          ]),
        ])
      ]),
      transition('* => advanced, * => routing, * => basics, * => programmatic, * => resources', [
        query(':enter', animateChild())
      ]),
      transition('* => *', [])
    ])
  ]
})
export class AppComponent {
  @HostBinding('@.disabled')
  animationsDisabled = false;

  @ViewChild('tooltip')
  public tooltip: ToolTipComponent;

  @ViewChild('modal')
  public modal: ModalComponent;

  // this will be true once all the photos are preloaded
  public ready = false;
  private _preloaded = false;
  private _timeoutDone = false;
  public percentage = 0;

  constructor(private _cd: ChangeDetectorRef, private _router: Router, private _tooltipService: ToolTipService, private _modalService: ModalService) {
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

  ngOnInit() {
    this.preloadPhotos(() => {
      this._preloaded = true;
      this.percentage = 100;
      this._onReady();
    }, (doneCount, totalCount) => {
      this.percentage = Math.ceil((doneCount / totalCount) * 100);
      this._cd.detectChanges();
    });

    setTimeout(() => {
      this._timeoutDone = true;
      this._onReady();
    }, MIN_PAGE_TIMEOUT);
  }

  private _onReady() {
    if (this._preloaded && this._timeoutDone) {
      this.ready = true;
      this._cd.detectChanges();
    }
  }

  preloadPhotos(onDoneCb: () => any, onProgressCb: (doneCount: number, totalCount: number) => any) {
    let count = 0;
    let done = false;
    const body = document.body;
    PHOTOS.forEach(photo => {
      const img = new Image();
      img.onload = onImageDone;
      img.src = photo.src;
    });

    function onImageDone() {
      if (!done && ++count >= PHOTOS.length) {
        done = true;
        onDoneCb();
      } else {
        onProgressCb(count, PHOTOS.length);
      }
    }
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
