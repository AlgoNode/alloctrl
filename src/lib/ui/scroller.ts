import { removeObject } from "$lib/helpers/arrays";
import { debounceAsync, debounceRAF } from "$lib/helpers/events";
import { get, writable, type Writable } from "svelte/store";
import scrollListener from "./scrollListener";
import resizeListener from "./resizeListener";
import { nextFrame } from "$lib/helpers/ui";
import { tick } from "svelte";

enum Direction {
  DOWN,
  UP,
}

export enum StickerState {
  IDLE,
  HIDDEN,
  SCROLLING,
  FIXED,
}

interface StickerElements {
  content: {
    element: HTMLElement,
    top: HTMLElement,
    bottom: HTMLElement,
  }
  container: {
    top: HTMLElement,
    bottom: HTMLElement,
  },
  spacer: HTMLElement,
}
interface Trigger {
  element: HTMLElement,
  visible: boolean,
}
export interface Sticker {
  content: {
    element: HTMLElement,
    top: Trigger,
    bottom: Trigger,
  }
  container: {
    top: Trigger,
    bottom: Trigger,
  },
  spacer: HTMLElement,
  box: DOMRect,
  stickAt: number,
  state: Writable<StickerState>,
}

function px(y: number) {
  return Math.round(y) + 'px';
}


/**
* SCROLLER CLASS
* ==================================================
*/
export class Scroller {
  private scrollCallback: (...args: any[]) => void;
  private resizeCallback: () => void;
  private stickers: Sticker[] = [];
  private top: number =  0;
  private direction: Direction = Direction.DOWN;
  private directionTreshold: number = 10;
  private resizing: boolean = false;
  
  /**
  * Init
  * ==================================================
  */
  constructor() {
    this.scrollCallback = debounceRAF(this.scrolled.bind(this));
    this.resizeCallback = debounceRAF(this.resized.bind(this));
  }

  public init() {
    if (!window) return;
    resizeListener.add(document.documentElement, {  fn: this.resizeCallback });
    window.addEventListener('scroll', this.scrollCallback)
  }
  public destroy() {
    if (!window) return;
    resizeListener.remove(document.documentElement);
    window.removeEventListener('scroll', this.scrollCallback)

  }

  /**
  * Register sticky elements 
  * ==================================================
  */
  public getSticker(content: HTMLElement) {
    return this.stickers.find(sticker => sticker.content.element === content);
  }

  public add(elements: StickerElements) {
    if (this.getSticker(elements.content.element)) return;
    const sticker = {
      content: {
        element: elements.content.element,
        top: { element: elements.content.top, visible: true },
        bottom: { element: elements.content.bottom, visible: true },
      },
      container: {
        top: { element: elements.container.top, visible: true },
        bottom: { element: elements.container.bottom, visible: true },
      },
      spacer: elements.spacer,
      box: elements.content.element.getBoundingClientRect(),
      state: writable(StickerState.IDLE),
      stickAt: 0,
    };
    this.stickers.push(sticker);
    this.sortStickers();
    this.updateStickPosition();
    this.updateStates();
    this.addTriggerListeners(sticker);
    return sticker;
  }

  public remove(content: HTMLElement) {
    const sticker = this.getSticker(content)
    if (!sticker) return;
    this.removeTriggerListeners(sticker)
    removeObject(this.stickers, (sticker => sticker.content.element === content))
  }

  /**
  * Viewport listeners
  * ==================================================
  */
  private attachListeners(sticker: Sticker, trigger: Trigger) {
    scrollListener.add(trigger.element, { 
      in: this.isIn.bind(this), 
      out: this.isOut.bind(this), 
      args: [sticker, trigger],
    });
  } 
  private addTriggerListeners(sticker: Sticker) {
    this.attachListeners(sticker, sticker.container.top);
    this.attachListeners(sticker, sticker.container.bottom);
    this.attachListeners(sticker, sticker.content.top);
    this.attachListeners(sticker, sticker.content.bottom);
  }
  private removeTriggerListeners(sticker: Sticker) {
    scrollListener.remove(sticker.container.top.element);
    scrollListener.remove(sticker.container.bottom.element);
    scrollListener.remove(sticker.content.top.element);
    scrollListener.remove(sticker.content.bottom.element);
  }

  private isIn (e: any, sticker: Sticker, trigger: Trigger) {
    trigger.visible = true;
    this.updateState(sticker);
    // console.log('in', trigger)
  }
  private isOut (e: any, sticker: Sticker, trigger: Trigger) {
    trigger.visible = false;
    this.updateState(sticker);
    // console.log('out', trigger)
  }
  

  /**
  * Resize
  * ==================================================
  */
  private resized = debounceAsync( async () => {
    // console.log('-------- resize')
    this.resizing = true;
    this.resetStates();
    await nextFrame();
    this.getBoxesSize();
    this.sortStickers();
    this.updateStickPosition();
    // await nextFrame();
    this.resizing = false;
    this.updateStates();
  });

  /**
  * Updates
  * ==================================================
  */
  private getBoxesSize() {
    this.stickers.forEach(sticker => {
      sticker.box = sticker.content.element.getBoundingClientRect();
      sticker.box.y += this.top;
    });
  }
  private sortStickers() {
    this.stickers.sort((a, b) => a.box.y - b.box.y);
  }
  private updateStickPosition() {
    let top: number = 0;
    this.stickers.forEach(sticker => {
      sticker.stickAt = top + 0;
      // sticker.container.top.element.style.top = -sticker.stickAt + 'px';
      top += sticker.box.height;
    });
  }


  /**
  * States
  * ==================================================
  */
  private resetStates() {
    this.stickers.forEach((sticker) => {
      this.setState(sticker, StickerState.IDLE)
    });
  }
  private updateStates() {
    this.stickers.forEach(this.updateState.bind(this));
  }
  private updateState(sticker: Sticker) {
    if (this.resizing) return;
    const { content, container } = sticker;
    // Scrolling up
    if (this.direction === Direction.UP) {
      if (container.top.visible) 
        return this.setState(sticker, StickerState.IDLE);
      else if (!content.top.visible)
        return this.setState(sticker, StickerState.SCROLLING);
      else if (content.top.visible)
        return this.setState(sticker, StickerState.FIXED);
    }

    // Scrolling down
    else {
      if (container.bottom.visible)
        return this.setState(sticker, StickerState.IDLE); 
      else if (!content.bottom.visible && !container.bottom.visible)
        return this.setState(sticker, StickerState.HIDDEN);
      else if (content.bottom.visible) 
        return this.setState(sticker, StickerState.SCROLLING);
      else if (!content.bottom.visible) 
        return this.setState(sticker, StickerState.HIDDEN);
    }

  }

  private setState(sticker: Sticker, state: StickerState) {
    const prevState = get(sticker.state)
    if (state === prevState) return;
    
    const box = sticker.box;
    const contentStyle = sticker.content.element.style;
    const spacerStyle = sticker.spacer.style;
    sticker.state.set(state);
        
    // Idle (reset)
    if (state === StickerState.IDLE) {
      contentStyle.position = '';
      contentStyle.top = '';
      contentStyle.left = '';
      contentStyle.width = '';
      spacerStyle.position = '';
      spacerStyle.width = '';
      spacerStyle.height = '';
      return;  
    }

    // spacer replaces content
    spacerStyle.position = 'relative';
    spacerStyle.width = px(box.width);
    spacerStyle.height = px(box.height);

    // scrolling
    if (state === StickerState.SCROLLING) {
      const offset = prevState === StickerState.HIDDEN
        ? box.height
        : 0;
      contentStyle.position = 'absolute';
      contentStyle.top = px(this.top - box.y - offset);
      contentStyle.left = '0px';
      contentStyle.width = px(box.width);
      return;
    }
    if (state === StickerState.FIXED) {
      contentStyle.position = 'fixed';
      contentStyle.top = px(sticker.stickAt);
      contentStyle.left = px(box.left);
      contentStyle.width = px(box.width);
      return;
    }
    if (state === StickerState.HIDDEN) {
      contentStyle.position = 'fixed';
      contentStyle.top = px(- box.height - 5);
      contentStyle.left = px(box.left);
      contentStyle.width = px(box.width);
      return;
    }


  }
 



  /**
  * Scroll
  * ==================================================
  */
  private scrolled(e: TouchEvent|Event) { 
    if (!window) return;

    const newTop = Math.round(window.scrollY);
    if (Math.abs(this.top - newTop) < this.directionTreshold) return;
    const prevDirection = this.direction;
    const newDirection = newTop < this.top ? Direction.UP : Direction.DOWN;
    this.top = newTop;
    this.direction = newDirection; 
    if (prevDirection !== newDirection) this.updateStates();
  }
}