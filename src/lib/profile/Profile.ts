import type { Writable } from "svelte/store";
import { get } from "svelte/store";
import { writable } from "svelte/store";
import { Theme } from "$lib/enums";
import BaseModule from "$lib/BaseModule";

export const theme = writable(Theme.AUTO);

class Profile extends BaseModule {
  protected settingsStore = 'profile/settings';
  public theme: Writable<Theme> = theme;
  public userTheme: Writable<Theme> = writable(Theme.AUTO);
  private deviceTheme: Writable<Theme> = writable(Theme.AUTO);

  constructor() {
    super();
    this.initTheme();
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


}


export default Profile;