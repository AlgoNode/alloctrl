

/**
* Debounced RAF
* ==================================================
*/
export function debounceRAF(fn: (...args: any[]) => void) {
  if (!window.requestAnimationFrame) return () => fn;
  let raf: number|undefined;
  return (...args: any[]) => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(() => {
      fn(...args);
      raf = undefined;
    });
  };
}


/**
* Debounced Async
* ==================================================
*/
export function debounceAsync(fn: (...args: any[]) => Promise<void>) {
  let busy: boolean = false;
  return async (...args: any[]) => {
    if (busy) return;
    busy = true;
    await fn(...args);
    busy = false;
  };
}