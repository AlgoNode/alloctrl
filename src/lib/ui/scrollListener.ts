export interface IntersectionOptions {
  once?: boolean,
  in?: (entry: IntersectionObserverEntry, ...args: any[]) => any,
  out?: (entry: IntersectionObserverEntry, ...args: any[]) => any,
  args?: any[],
}

export interface IntersectingElement extends Element {
  intersectionOptions?: IntersectionOptions,
}

type ViewportElement = Element|Document|undefined

/**
* Scroll Listener
* ==================================================
*/
class ScrollListener {
  private viewport?: ViewportElement;
  private observer?: IntersectionObserver;

  //
  // Init the viewport
  // ----------------------------------------------
  init(viewport?: ViewportElement) {
    this.viewport = viewport;
    this.observer = new IntersectionObserver(
      this.intersects.bind(this), 
      { 
        root: this.viewport,
        rootMargin: '2px 0px 2px 0px',
      }
    );
  }

  //
  // Add element to watch
  // ----------------------------------------------
  add(element: IntersectingElement, options: IntersectionOptions) {
    if(!this.observer) return;
    element.intersectionOptions = {
      once: false,
      ...options,
    };
    this.observer.observe(element);
  }

  //
  // Remove elements to watch
  // ----------------------------------------------
  remove(element: IntersectingElement) {
    if(!this.observer) return;
    delete element.intersectionOptions;
    this.observer.unobserve(element);
  }

  //
  // Callbacks
  // ----------------------------------------------
  intersects(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const target = entry.target as IntersectingElement;
      const options = target.intersectionOptions; 
      if (!options) return;
      if (options.out && entry.intersectionRatio === 0) {
        options.out( entry, ...(options.args||[]) );
        if (options.once) this.remove(target);
      }
      else if (options.in && entry.intersectionRatio > 0) {
        options.in( entry, ...(options.args||[]) );
        if (options.once) this.remove(target);
      }
    });
    
  }


}


export default new ScrollListener();