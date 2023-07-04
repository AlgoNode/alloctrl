import algo from '$assets/tokens/algo.svg?raw';
import logo from '$assets/logos/allo-ctrl.svg?raw';

import defly from '$assets/logos/defly.svg?raw';
import pera from '$assets/logos/pera.svg?raw';
import discord from '$fa/brands/discord.svg?raw';
import twitter from '$fa/brands/twitter.svg?raw';

import chevronRight from '$fa/solid/chevron-right.svg?raw';
import close from '$fa/solid/xmark.svg?raw';
import copy from '$fa/solid/copy.svg?raw';
import moon from '$fa/solid/moon.svg?raw';
import sort from '$fa/solid/sort.svg?raw';
import sun from '$fa/solid/sun.svg?raw';
import user from '$fa/regular/user.svg?raw';

/**
 * Merge all imports in a single list
 * ==================================================
 */
const list: Record<string, string> = {
  algo,
  logo,
  
  defly,
  pera,
  discord,
  twitter,

  close,
  chevronRight,
  copy,
  moon,
  select: sort,
  sort,
  sun,
  user
}
export default list;
