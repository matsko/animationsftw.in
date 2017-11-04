import { Input, ChangeDetectorRef, ElementRef, Directive } from '@angular/core';
import { ComponentType, ToolTipService } from './tool-tip.service';

@Directive({
  selector: '[appToolTipHover]'
})
export class ToolTipHoverDirective {
  private _element: any;

  public debounceTime = 500;

  @Input('appToolTipHover')
  public type: ComponentType;

  constructor(element: ElementRef, private _service: ToolTipService, private _cd: ChangeDetectorRef) {
    this._element = element.nativeElement;
    this._element.addEventListener('mouseover', () => this.onEnter(this.type));
    this._element.addEventListener('mouseout', () => {
      setTimeout(this.debounceTime, () => this.onLeave());
    });
  }

  onEnter(type: ComponentType) {
    const {x,y} = this._getCoordinates();
    this._service.show(type, x, y);
    // we do this because of mouseenter / mouseleave being custom events
    this._cd.detectChanges();
  }

  onLeave() {
    this._service.hide();
    // we do this because of mouseenter / mouseleave being custom events
    this._cd.detectChanges();
  }

  private _getCoordinates() {
    const box = this._element.getBoundingClientRect();
    return {x: box.x,y: box.y};
  }
}
