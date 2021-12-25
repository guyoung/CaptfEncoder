import {Injectable, EventEmitter} from '@angular/core';

export interface AppThemeItem {
  href: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}


@Injectable()
export class ThemeStorage {
  static storageKey = 'app-theme-storage-current';

  public onThemeUpdate: EventEmitter<AppThemeItem> = new EventEmitter<AppThemeItem>();

  public storeTheme(theme: AppThemeItem) {
    try {
      window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    } catch (e) { }

    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): AppThemeItem {
    try {
      return JSON.parse(window.localStorage[ThemeStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) { }
  }
}
