import { browser } from "$app/environment";


export default abstract class Storage {
  private static namespace = 'ctrl';
  private static stores: Record<string, Record<string, string|number>> = {};

  /**
  * Get a value saved in LocalStorage.
  * Stores are kept in memory
  * ==================================================
  */
  public static getValue(store: string, key: string) {
    if (!browser || !window?.localStorage) return undefined;
    const storeName = `${this.namespace}/${store}`;
    if (!this.stores[store]) {
      this.stores[store] = JSON.parse(window.localStorage.getItem(storeName) || '{}');
    }
    return this.stores[store][key];
  }

  /**
  * Get a value saved in LocalStorage.
  * Stores are kept in memory
  * ==================================================
  */
  public static setValue(store: string, key: string, value: string|number) {
    if (!browser || !window?.localStorage) return undefined;
    const storeName = `${this.namespace}/${store}`;
    if (!this.stores[store]) {
      this.stores[store] = JSON.parse(window.localStorage.getItem(storeName) || '{}');
    }
    this.stores[store][key] = value;
    window.localStorage.setItem(storeName, JSON.stringify(this.stores[store]));
    return this.stores[store];
  }

}