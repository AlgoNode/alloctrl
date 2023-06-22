

/**
* Async await for next frame
* ==================================================
*/
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (window === undefined) return resolve();
    window.requestAnimationFrame(() => { 
      window.requestAnimationFrame(() => { 
        resolve(); 
      }); 
    });
  });
}