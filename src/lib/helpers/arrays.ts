


/**
* remove element by value
* ==================================================
*/
export function removeObject<T>(array: T[], condition: (el: T) => boolean) {
  const index = array.findIndex(condition);
  if (index !== -1) array.splice(index, 1);
}
export function removeValue<T>(array: T[], value: T) {
  const index = array.indexOf(value);
  if (index !== -1) array.splice(index, 1);
}
