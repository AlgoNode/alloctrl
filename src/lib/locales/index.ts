import { get } from 'lodash-es';
import dashboard from './dashboard';
import errors from './errors';
import forms from './forms';
import nav from './nav';
import participation from './participation';
import ui from './ui';
import versions from './versions';
import wallet from './wallet';


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
  ui,
  versions,
  wallet,
}

export default function __(key: string) {
  return get(strings, key)
}
