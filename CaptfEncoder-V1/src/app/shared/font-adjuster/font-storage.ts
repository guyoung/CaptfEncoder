import {Injectable, EventEmitter} from '@angular/core';

export interface AppFontItem {
  fontFamily: string;
  fontSize: number;

}


@Injectable()
export class FontStorage {
  static storageKey = 'app-font-storage-current';

  public onThemeUpdate: EventEmitter<AppFontItem> = new EventEmitter<AppFontItem>();

  public storeFont(font: AppFontItem) {
    try {
      window.localStorage[FontStorage.storageKey] = JSON.stringify(font);
    } catch (e) { }

    this.onThemeUpdate.emit(font);
  }

  public getStoredFont(): AppFontItem {
    try {
      return JSON.parse(window.localStorage[FontStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(FontStorage.storageKey);
    } catch (e) { }
  }
}
