import { Injectable } from '@angular/core';

@Injectable()
export class CodeExampleService {
  private _callbacks: ((status: string) => {})[] = [];

  constructor() { }

  onChange(fn: (status: string) => any) {
    this._callbacks.push(fn);
  }

  private _signalChange(status: string) {
    this._callbacks.forEach(fn => fn(status));
  }

  open() {
    this._signalChange('open');
  }

  close() {
    this._signalChange('close');
  }
}
