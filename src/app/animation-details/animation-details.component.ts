import { Component } from '@angular/core';
import { AnimationItem, AnimationCountService } from '../animation-count.service'
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-animation-details',
  templateUrl: './animation-details.component.html',
  styleUrls: ['./animation-details.component.scss']
})
export class AnimationDetailsComponent {
  constructor(private _service: AnimationCountService, private _modal: ModalService) { }

  get animationItems(): AnimationItem[] {
    return this._service.items;
  }

  loadAnimationDetails(item: AnimationItem) {
    this._modal.show(item.fileName);
  }
}
