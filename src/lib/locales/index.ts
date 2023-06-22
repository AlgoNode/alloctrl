import { get } from 'lodash-es';
import dashboard from './dashboard';
import nav from './nav';
import participation from './participation';


/**
* Get String
* ==================================================
*/
export const strings = {
  dashboard,
  nav,
  participation,
}

export default function __(key: string) {
  return get(strings, key)
}
