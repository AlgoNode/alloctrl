


/**
* remove element by value
* ==================================================
*/
export function removeObject<T>(array: T[], condition: (el: T) => boolean) {
  var index = array.findIndex(condition);
  if (index !== -1) array.splice(index, 1);
}
export function removeValue<T>(array: T[], value: T) {
  var index = array.indexOf(value);
  if (index !== -1) array.splice(index, 1);
}
