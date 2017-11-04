import { EventEmitter, Injectable } from '@angular/core';

export enum ComponentType {
  ANIMATIONS = 'animations'
}

export interface ToolTipEvent {
  action: string;
  type?: ComponentType;
  data?: {
    x: string|number,
    y: string|number
  }
}

@Injectable()
export class ToolTipService {
  public changes = new EventEmitter<ToolTipEvent>();

  position(type: ComponentType, x: number|string, y: number|string) {
    this.changes.emit({
      action: 'reposition',
      type,
      data: {
        x,y
      }
    });
  }

  show(type: ComponentType, x: number|string, y: number|string) {
    this.changes.emit({
      action: 'show',
      type,
      data: {
        x,y
      }
    });
  }

  hide() {
    this.changes.emit({ action: 'hide' });
  }
}
