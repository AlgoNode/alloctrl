export interface ResizeOptions {
  fn?: (entry: ResizeObserverEntry, ...args: any[]) => any,
  args?: any[],
}

export interface ResizingElement extends Element {
  resizeOptions?: ResizeOptions,
}

/**
* Scroll Listener
* ==================================================
*/
class ResizeListener {
  private observer?: ResizeObserver;

  //
  // Init the viewport
  // ----------------------------------------------
  init() {
    this.observer = new ResizeObserver(this.resized.bind(this));
  }

  //
  // Add element to watch
  // ----------------------------------------------
  add(element: ResizingElement, options: ResizeOptions) {
    if(!this.observer) return;
    element.resizeOptions = options;
    this.observer.observe(element);
  }

  //
  // Remove elements to watch
  // ----------------------------------------------
  remove(element: ResizingElement) {
    if(!this.observer) return;
    delete element.resizeOptions;
    this.observer.unobserve(element);
  }

  //
  // Callbacks
  // ----------------------------------------------
  resized(entries: ResizeObserverEntry[]) {
    entries.forEach(entry => {
      const target = entry.target as ResizingElement;
      const options = target.resizeOptions; 
      if (!options) return;
      if (options.fn) {
        options.fn( entry, ...(options.args||[]) );
      }
    });
    
  }


}


export default new ResizeListener();