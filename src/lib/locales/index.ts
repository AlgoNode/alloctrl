import { get } from 'lodash-es';
import dashboard from './dashboard';
import errors from './errors';
import forms from './forms';
import nav from './nav';
import participation from './participation';


/**
* Get String
* ==================================================
*/
export const strings = {
  dashboard,
  errors,
  forms,
  nav,
  participation,
}

export default function __(key: string) {
  return get(strings, key)
}
