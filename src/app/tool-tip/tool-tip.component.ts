import { ElementRef, HostBinding, Component } from '@angular/core';
import { trigger, state, transition, animate, style, query } from '@angular/animations';
import { ComponentType } from '../tool-tip.service';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],
  animations: [
    trigger('tooltipAnimations', [
      state('visible', style({
        top: '{{ y }}px',
        left: '{{ x }}px',
      }), {params: {x: '0', y: '0'}}),
      state('hidden', style({
        left: '-9999px',
        top: '-9999px',
      })),
      transition('* => visible', [
        style({
          opacity:0,
          transform: 'translateY(20px)',
          top: '{{ y }}px',
          left: '{{ x }}px',
        }),
        animate('300ms ease-out', style({opacity:1, transform: 'none'}))
      ]),
      transition('* => hidden', [
        animate('300ms ease-out', style({opacity:0, transform: 'translateY(20px)'}))
      ])
    ])
  ]
})
export class ToolTipComponent {
  public x: string|number;
  public y: string|number;
  public visible = false;
  public type: ComponentType;
  public types = ComponentType;
  private _element: any;

  public offsetX = -15;
  public offsetY = 30;
  public hover = false;

  @HostBinding('@tooltipAnimations')
  get state() {
    return {
      value: this.visible ? 'visible' : 'hidden',
      params: {
        x: this.x,
        y: this.y,
      }
    }
  }

  constructor(element: ElementRef) {
    this._element = element.nativeElement;
    this._element.addEventListener('mouseenter', () => this.hover = true);
    this._element.addEventListener('mouseleave', () => {
      this.hover = false;
      this.hide();
    });
  }

  position(type: ComponentType, x: string|number, y: string|number) {
    const _x = parseInt(x as string);
    const _y = parseInt(y as string);
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const boxWidth = this._element.clientWidth;
    const boxHeight = this._element.clientHeight;
    let xPos = _x - (boxWidth / 2);
    if ((_x + boxWidth) > pageWidth) {
      xPos = pageWidth - boxWidth;
    }
    this.type = type;
    this.x = xPos + this.offsetX;
    this.y = _y + this.offsetY;
  }

  hide() {
    if (!this.hover) {
      this.visible = false;
    }
  }

  show() {
    this.visible = true;
  }
}
