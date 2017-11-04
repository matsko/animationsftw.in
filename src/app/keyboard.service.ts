export const enum Keys {
  KEY_LEFT = 37,
  KEY_UP = 38,
  KEY_RIGHT = 39,
  KEY_DOWN = 40,
  KEY_ESCAPE = 27
};

const KEY_EVENT = 'keydown';

export class KeyboardBinding {
  private _fn: (e: any) => any;

  constructor(keys: Keys[], callback: (keyCode: number, event: any) => any) {
    this._registerFn(keys, callback);
  }

  private _registerFn(keys: Keys[], callback: (keyCode: number, event: any) => any) {
    this._fn = e => {
      const code = e.keyCode;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key == code) {
          event.preventDefault();
          event.stopPropagation();
          callback(key, event);
          break;
        }
      }
    };
    window.addEventListener(KEY_EVENT, this._fn);
  }

  deregister() {
    window.addEventListener(KEY_EVENT, this._fn);
  }
}
