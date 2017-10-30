import { Injectable } from '@angular/core';

const ESC_KEY = 27;

@Injectable()
export class ModalService {
  constructor() {
    document.body.addEventListener('keydown', e => {
      if (e.keyCode == ESC_KEY) {
        this.hide();
      }
    })
  }

  visible = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
