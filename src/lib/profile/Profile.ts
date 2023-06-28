import type { Writable } from "svelte/store";
import type { Connector } from "algostack";
import type { WalletStore } from "./types";
import { get } from "svelte/store";
import { writable } from "svelte/store";
import { Theme } from "$lib/enums";
import BaseModule from "$lib/BaseModule";
import algostack from "$lib/api/algostack.public";

export const theme = writable(Theme.AUTO);

class Profile extends BaseModule {
  protected settingsStore = 'profile';
  public theme: Writable<Theme> = theme;
  public userTheme: Writable<Theme> = writable(Theme.AUTO);
  private deviceTheme: Writable<Theme> = writable(Theme.AUTO);
  public wallet: WalletStore = writable({
    connector: undefined,
    addresses: undefined,
    currentAddress: undefined,
  } );

  constructor() {
    super();
    // Theme
    this.initTheme();

    // Wallet
    if (!algostack.client) return;
    this.wallet.update($wallet => ({
      ...$wallet,
      connector: algostack.client?.connected as Connector,
      addresses: algostack.client?.addresses,
      currentAddress: algostack.client?.addresses[0],
    }));
  }


  /**
  * Theme
  * ==================================================
  */
  private initTheme() {
    // user theme
    this.syncSettings('theme', this.userTheme, Theme.AUTO);
    this.subscribe(this.userTheme, this.updateTheme.bind(this));
    // adevice theme
    if (typeof window === 'undefined') return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    this.deviceThemeChanged(media);
    media.addListener( this.deviceThemeChanged.bind(this) ); 
  }
  private deviceThemeChanged(e: any ) {
    const isDark = e.matches;
    this.deviceTheme.set(isDark ? Theme.DARK : Theme.LIGHT);
    this.updateTheme();
  }
  private updateTheme() {
    const userTheme = get(this.userTheme);
    const deviceTheme = get(this.deviceTheme); 
    this.theme.set(
      userTheme === Theme.AUTO ? deviceTheme : userTheme
    );
  } 


  /**
  * Wallet
  * ==================================================
  */
  public async connect( connector: Connector ) {
    if (!algostack.client) return;
    const addresses = await algostack.client.connect.call(algostack.client, connector)
    if (!addresses?.length) return;
    this.wallet.update($wallet => ({
      ...$wallet,
      connector,
      addresses,
      currentAddress: addresses[0],
    }));
  }

  public async disconnect() {
    this.wallet.update($wallet => ({
      ...$wallet,
      connector: undefined,
      addresses: [],
      currentAddress: undefined,
    }));
    if (!algostack.client) return;
    algostack.client.disconnect();
  }


}


export default Profile;