import { get } from 'lodash-es';
import nav from './nav';


/**
* Get String
* ==================================================
*/

export const strings = {
  nav,
}

export default function __(key: string) {
  return get(strings, key)
}
