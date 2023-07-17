import algo from '$assets/tokens/algo.svg?raw';
import logo from '$assets/logos/allo-ctrl-beta.svg?raw';

import defly from '$assets/logos/defly.svg?raw';
import pera from '$assets/logos/pera.svg?raw';
import discord from '$fa/brands/discord.svg?raw';
import twitter from '$fa/brands/twitter.svg?raw';


import arrowsRotate from '$fa/solid/arrows-rotate.svg?raw';
import chartNetwork from '$fa/solid/globe.svg?raw';
import circleCheck from '$fa/solid/circle-check.svg?raw';
import chevronRight from '$fa/solid/chevron-right.svg?raw';
import copy from '$fa/solid/copy.svg?raw';
import circleExclamation from '$fa/solid/circle-exclamation.svg?raw';
import fileSignature from '$fa/solid/file-signature.svg?raw';
import moon from '$fa/solid/moon.svg?raw';
import sort from '$fa/solid/sort.svg?raw';
import sun from '$fa/solid/sun.svg?raw';
import squareCheck from '$fa/solid/square-check.svg?raw';
import triangleExclamation from '$fa/solid/triangle-exclamation.svg?raw';
import user from '$fa/regular/user.svg?raw';
import xmark from '$fa/solid/xmark.svg?raw';

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

  peers: chartNetwork,
  close: xmark,
  chevronRight,
  copy,
  error: circleExclamation,
  moon,
  proposal: fileSignature,
  ok: circleCheck,
  select: sort,
  sort,
  sun,
  sync: arrowsRotate,
  user,
  vote: squareCheck,
  warning: triangleExclamation,
}
export default list;
