import type { SetStatusCallback, StatusProps } from "./types";
import type { Readable } from "svelte/store";
import { readable } from "svelte/store";
import { Method } from "$lib/enums";
import AlgodApi from "$lib/api/algod";
/**
* Component lifecycle
* ==================================================
*/
let lastRound: number|undefined;
let blockTime: number|undefined;
let lastTimestamp: number;
let sampleSize: number = 0;
let averageBlockTime: number = 3.7;
let updateTimeout: NodeJS.Timeout;

async function init() {
  const status = await AlgodApi.private.get('/v2/status');
  lastRound = status.lastRound;
}
init();

/**
 * Readable status store
 * ==================================================
 */
const status: Readable<StatusProps> = readable({
  lastRound,
  blockTime,
  averageBlockTime,
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
  const status = await AlgodApi.private.get(`/v2/status/wait-for-block-after/${lastRound}`);
  lastRound = status.lastRound as number;
  const currentTimestamp = Date.now() - (status.timeSinceLastRound / 100_000_000);
  if (lastTimestamp) {
    blockTime = (currentTimestamp - lastTimestamp) / 1000;
    averageBlockTime = ((averageBlockTime * sampleSize) + blockTime) / ++sampleSize;
  }
  lastTimestamp = currentTimestamp;
  set({ lastRound, blockTime, averageBlockTime });
  update(set);
}

export default status;

