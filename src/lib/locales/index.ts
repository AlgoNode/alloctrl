import { get } from 'lodash-es';
import block from './block';


/**
* Get String
* ==================================================
*/

export const strings = {
  block,
}

export default function __(key: string) {
  return get(strings, key)
}
