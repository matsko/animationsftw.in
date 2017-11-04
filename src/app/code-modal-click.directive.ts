import { Input, HostListener, Directive } from '@angular/core';
import { ModalService, ModalEvent } from './modal.service';

@Directive({
  selector: '[appCodeModalClick]'
})
export class CodeModalClickDirective {
  @Input('appCodeModalClick')
  public src: string;

  @HostListener('click', ['$event'])
  public onClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this._modal.show(this.src);
  }

  constructor(private _modal: ModalService) {}
}
