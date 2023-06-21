import type { SetStatusCallback, StatusProps } from "./types";
import type { Readable } from "svelte/store";
import { readable } from "svelte/store";
import { Method } from "$lib/enums";
import AlgodApi from "$lib/api/algod";
/**
* Component lifecycle
* ==================================================
*/
let lastRound: number;
let blockTime: number|undefined;
let lastTimestamp: number;
let updateTimeout: NodeJS.Timeout;

async function init() {
  const status = await AlgodApi.private(Method.GET,'/v2/status');
  lastRound = status.lastRound;
}
init();

/**
 * Readable status store
 * ==================================================
 */
const status: Readable<StatusProps> = readable({
  lastRound: undefined,
  blockTime: undefined,
}, start) 

function start(set: SetStatusCallback) {
  update(set);
  return destroy;
}
function destroy() {
  if (updateTimeout) clearTimeout(updateTimeout);
}

async function update(set: SetStatusCallback) {
  if (!lastRound) {
    updateTimeout = setTimeout( () => update(set), 1000 );
    return;
  }
  const status = await AlgodApi.private(Method.GET,`/v2/status/wait-for-block-after/${lastRound}`);
  lastRound = status.lastRound as number;
  const currentTimestamp = Date.now() - (status.timeSinceLastRound / 100_000_000);
  if (lastTimestamp) blockTime = (currentTimestamp - lastTimestamp) / 1000;
  lastTimestamp = currentTimestamp;
  set({ lastRound, blockTime });
  update(set);
}

export default status;

