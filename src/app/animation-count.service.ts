import { Injectable } from '@angular/core';

@Injectable()
export class AnimationCountService {
  private _total: number = 0;

  get total() {
    return this._total;
  }

  setTotal(total: number) {
    this._total = total;
  }
}
