import { EventEmitter, Injectable } from '@angular/core';

const ESC_KEY = 27;

export interface ModalEvent {
  action: string;
  codeFileName?: string;
  data?: {}
}

@Injectable()
export class ModalService {
  public changes = new EventEmitter<ModalEvent>();

  constructor() {
    document.body.addEventListener('keydown', e => {
      if (e.keyCode == ESC_KEY) {
        this.hide();
      }
    })
  }

  show(fileName: string) {
    this.changes.emit({
      action: 'show',
      codeFileName: fileName
    });
  }

  hide() {
    this.changes.emit({
      action: 'hide'
    });
  }
}
