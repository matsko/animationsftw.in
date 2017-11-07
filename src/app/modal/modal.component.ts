import { Component, EventEmitter, Output, Input } from '@angular/core';
import { trigger, transition, animate, style, query, state, group, animateChild } from '@angular/animations';
import { Http } from '@angular/http';

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        group([
          query('.overlay', animateChild()),
          query('.frame', animateChild())
        ])
      ]),
    ]),
    trigger('overlayAnimation', [
      state('*', style({ backgroundColor: 'rgba(0,0,0,0.5)' })),
      transition(':enter', [
        style({ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }),
        animate('200ms ' + NICE_EASING)
      ]),
    ]),
    trigger('frameAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ' + NICE_EASING, style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class ModalComponent {
  public visible = false;
  public status: 'loading'|'ready' = 'loading';
  public fileName: string;

  constructor(private _http: Http) { }

  setDetails(codeFileName: string) {
    this.status = 'loading';
    this.fileName = codeFileName;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
