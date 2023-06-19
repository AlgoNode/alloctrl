import type { Unsubscriber, Writable } from "svelte/store";



class BaseModule {
  protected settingsStore = 'profile';
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
    const saved = await this.getProfileSetting(this.settingsStore, key);
    if (saved) data = saved;
    store.set(data);
    this.subscribe(store, async (data) => {
      await this.setProfileSetting(this.settingsStore, key, data);
    })
    return data;
  }


  private async getProfileSetting(key: string, index: number|string) {
    return ;
    const storage = window?.localStorage;
  }

  private async setProfileSetting(store: string, index: number|string, data: any) {
    return; 

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