import { Component, HostBinding, EventEmitter, Output, Input } from '@angular/core';
import { trigger, transition, animate, style, query, state, group, animateChild } from '@angular/animations';
import { ModalService } from '../modal.service';

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
        animate('200ms ease-out')
      ]),
    ]),
    trigger('frameAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-60%) translateX(-50%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: '*' }))
      ]),
    ]),
  ]
})
export class ModalComponent {
  @HostBinding('@modalAnimation')
  public animate = true;

  constructor(private _modalService: ModalService) { }

  hide() {
    this._modalService.hide();
  }
}
