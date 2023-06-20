import type { Unsubscriber, Writable } from "svelte/store";
import Storage from "./storage/Storage";



class BaseModule {
  protected settingsStore = 'module';
  protected subs: Unsubscriber[] = [];
  constructor() {}

  /**
  * Stores
  * ==================================================
  */
  protected subscribe(store: Writable<unknown>, callback: (...args: any[]) => unknown) {
    this.subs.push( store.subscribe(callback) );
  }

  
  /**
  * Settings
  * ==================================================
  */
  protected async syncSettings<T>(key: string, store: Writable<T>, defaults: T): Promise<T> {
    let data = defaults;
    const saved = await this.getProfileSetting(key);
    if (saved) data = saved;
    store.set(data);
    this.subscribe(store, async (data) => {
      await this.setProfileSetting(key, data);
    })
    return data;
  }


  private async getProfileSetting(key: string) {
    return Storage.getValue(this.settingsStore, key);
  }

  private async setProfileSetting(key: string, value: any) {
    return Storage.setValue(this.settingsStore, key, value); 

  }


  /**
  * Storage
  * ==================================================
  */



  /**
  * Destroy
  * ==================================================
  */
  public destroy() {
    this.subs.forEach(sub => sub());
  }

}


export default BaseModule;